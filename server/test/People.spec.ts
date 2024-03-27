import { describe, it, expect } from "bun:test";
import { app } from "../src";
import { PersonController } from "../src/controllers/PersonController";
import { del, post, put, req } from "./utils";

describe("GET /api/person", () => {
  it.skip("should create a new user and return a success response", async () => {
    const date = new Date();
    const userEmail = "user" + date.getTime() + "@example.com";

    const response = await app.handle(post("/api/auth/register", {
      firstName: "John",
      lastName: "Doe",
      email: userEmail,
      password: "PasswordStrong123",
    }))

    expect(response.status).toBe(201);
    const { user, token } = JSON.parse(await response.text())
    expect(user).toBeTruthy();
    expect(token).toBeTruthy();
  });

  it("should return an error when registration data is invalid", async () => {
    const response = await app.handle(post("/api/auth/register", { firstName: "", lastName: "", email: "", password: "" }))

    expect(response.status).toBe(400);

    const { error } = JSON.parse(await response.text())
    expect(error).toBe("All fields are required");
  });

  it("should return an error when the email is already in use", async () => {
    const response = await app.handle(post("/api/auth/register", {
      firstName: "Jane",
      lastName: "Smith",
      email: "user@example.com",
      password: "Password123",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text())

    expect(error).toBe("Email already in use");
  });

  it("should return an error when the password is too weak (must be at least 8 characters long)", async () => {
    const response = await app.handle(post("/api/auth/register", {
      firstName: "Alice",
      lastName: "Johnson",
      email: "user7@example.com",
      password: "12345",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text())

    expect(error).toBe(
      "Password is too weak (must be at least 8 characters long)"
    );
  });

  it("should return an error when the password is too weak (must contain at least one uppercase letter)", async () => {
    const response = await app.handle(post("/api/auth/register", {
      firstName: "Alice",
      lastName: "Johnson",
      email: "user7@example.com",
      password: "password123",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text())

    expect(error).toBe(
      "Password is too weak (must contain at least one uppercase letter)"
    );
  });

  it("should return an error when the password is too weak (must contain at least one lowercase letter)", async () => {
    const response = await app.handle(post("/api/auth/register", {
      firstName: "Alice",
      lastName: "Johnson",
      email: "user7@example.com",
      password: "PASSWORD123",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text())

    expect(error).toBe(
      "Password is too weak (must contain at least one lowercase letter)"
    );
  });

  it("should return an error when the password is too weak (must contain at least one  number)", async () => {
    const response = await app.handle(post("/api/auth/register", {
      firstName: "Alice",
      lastName: "Johnson",
      email: "user7@example.com",
      password: "PASSWORd",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text())

    expect(error).toBe(
      "Password is too weak (must contain at least one number)"
    );
  });

  it("should return an error when the email is invalid", async () => {
    const response = await app.handle(post("/api/auth/register", {
      firstName: "Bob",
      lastName: "Brown",
      email: "invalid_email",
      password: "password123",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text())

    expect(error).toBe("Invalid email format");
  });

  it("Should return a 500 error and error message", async () => {
    const body = {};
    const set = {
      status: function (statusCode: number) {
        expect(statusCode).toBe(500);
        return {
          json: function (responseJson: { error: any; }) {
            expect(responseJson.error).toBe("Internal server error");
          },
        };
      },
    };

    await PersonController.getAllPeople({body, set});
  });
});
/**
describe("GET /api/person:id", () => {
  it("Should return a 200 status code and the person object", async () => {
    const response = await app.handle(req("/api/person/1"));

    expect(response.status).toBe(200);
    const { person } = JSON.parse(await response.text());
    expect(person).toBeTruthy();
    expect(person.id).toBe(1);
    expect(person.name).toBe("John Doe");
    expect(person.email).toBe("john.doe@example.com");
  });

  it("Should return a 404 status code and an error message", async () => {
    const response = await app.handle(req("/api/person/999"));

    expect(response.status).toBe(404);
    const { error } = JSON.parse(await response.text());
    expect(error).toBe("Person not found");
  });
})

describe("POST /api/person", () => {
  it("Should return a 201 status code and the created person object", async () => {
    const response = await app.handle(post("/api/person", {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "XXXXXXXXXXXXXXXXX",
    }));

    expect(response.status).toBe(201);
    const { person } = JSON.parse(await response.text());
    expect(person).toBeTruthy();
    expect(person.id).toBe(2);
    expect(person.name).toBe("Jane Doe");
    expect(person.email).toBe("jane.doe@example.com");
  });

  it("Should return a 400 status code and an error message", async () => {
    const response = await app.handle(post("/api/person", {
      name: "",
      email: "jane.doe@example.com",
      password: "XXXXXXXXXXXXXXXXX",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text());
  })
})

describe("PUT /api/person:id", () => {
  it("Should return a 200 status code and the updated person object", async () => {
    const response = await app.handle(put("/api/person/1", {
      name: "John Smith",
      email: "john.smith@example.com",
      password: "XXXXXXXXXXXXXXXXX",
    }));

    expect(response.status).toBe(200);
    const { person } = JSON.parse(await response.text());
    expect(person).toBeTruthy();
    expect(person.id).toBe(1);
    expect(person.name).toBe("John Smith");
    expect(person.email).toBe("john.smith@example.com");
  });

  it("Should return a 400 status code and an error message", async () => {
    const response = await app.handle(put("/api/person/1", {
      name: "",
      email: "john.smith@example.com",
      password: "XXXXXXXXXXXXXXXXX",
    }));

    expect(response.status).toBe(400);
    const { error } = JSON.parse(await response.text());
  })
})

describe("DELETE /api/person:id", () => {
  it("Should return a 204 status code and no content", async () => {
    const response = await app.handle(del("/api/person/1"));

    expect(response.status).toBe(204);
    const { text } = JSON.parse(await response.text());

    expect(text).toBe("");
  });

  it("Should return a 404 status code and an error message", async () => {
    const response = await app.handle(del("/api/person/999"));

    expect(response.status).toBe(404);
    const { error } = JSON.parse(await response.text());
    expect(error).toBe("Person not found");
  });
})
 */
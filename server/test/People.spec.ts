import { describe, it, expect } from "bun:test";
import { app } from "../src";
import { PersonController } from "../src/controllers/PersonController";
import { del, post, put, req } from "./utils";

describe("GET /api/person", () => {
	it("should return a list of people", async () => {
		const response = await app.handle(req("/api/person"));

		expect(response.status).toBe(200);
		const { people } = JSON.parse(await response.text());
		expect(people).toBeTruthy();
	});

	it("should return a list of people with pagination", async () => {
		const response = await app.handle(req("/api/person?page=1&limit=2"));

		expect(response.status).toBe(200);
		const { people } = JSON.parse(await response.text());
		expect(people).toBeTruthy();
		expect(people.length).toBe(2);
	});

	it("should return a list of people with pagination and search", async () => {
		const response = await app.handle(
			req("/api/person?page=1&limit=2&search=João"),
		);

		expect(response.status).toBe(200);
		const { people } = JSON.parse(await response.text());
		expect(people).toBeTruthy();
		expect(people.length).toBe(1);
	});

	it("Should return a 500 error and error message", async () => {
		const query = {};
		const set = {
			status: function (statusCode: number) {
				expect(statusCode).toBe(500);
				return {
					json: function (responseJson: any) {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await PersonController.getAllPeople({ query, set });
	});
});

describe("GET /api/person/:id", () => {
	it.skip("Should return a 200 status code and the person object", async () => {
		const response = await app.handle(req("/api/person/1"));

		expect(response.status).toBe(200);
		const { person } = JSON.parse(await response.text());
		expect(person).toBeTruthy();
		expect(person.id).toBe(1);
		expect(person.name).toBe("João");
	});

	it("Should return a 404 status code and an error message", async () => {
		const response = await app.handle(req("/api/person/999"));

		expect(response.status).toBe(404);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Person not found");
	});

	it("Should return a 500 error and error message", async () => {
		const params = {};
		const set = {
			status: function (statusCode: number) {
				expect(statusCode).toBe(500);
				return {
					json: function (responseJson: any) {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await PersonController.getPersonById({ params, set });
	});
});

describe("POST /api/person", () => {
	it("Should return a 201 status code and the created person object", async () => {
		const response = await app.handle(
			post("/api/person", {
				name: "Jane Doe",
				email: "jane@example.com",
				gender: "female",
				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(201);
		const { person } = JSON.parse(await response.text());
		expect(person).toBeTruthy();
		expect(person.name).toBe("Jane Doe");
		expect(person.gender).toBe("female");
		expect(person.birthday).toBe("1990-01-01");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/person", {
				name: "",
				email: "jane@example.com",

				gender: "female",
				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Name is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/person", {
				name: "Jane Doe",
				gender: "",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Gender is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/person", {
				name: "Jane Doe",
				gender: "female",
				birthDay: "",
				email: "jane@example.com",

				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Birthday is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/person", {
				name: "Jane Doe",
				gender: "female",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Marital status is required");
	});

	it.skip("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/person", {
				name: "Jane Doe",
				gender: "female",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Person already exists");
	});

	it("Should return a 500 error and error message", async () => {
		const body = {};
		const set = {
			status: function (statusCode: number) {
				expect(statusCode).toBe(500);
				return {
					json: function (responseJson: any) {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await PersonController.createPerson({ body, set });
	});
});

describe("PUT /api/person/:id", () => {
	it.skip("Should return a 200 status code and the updated person object", async () => {
		const response = await app.handle(
			put("/api/person/25", {
				name: "Jane Doe",
				gender: "female",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "mariage",
			}),
		);

		expect(response.status).toBe(200);
		const { updatedPerson } = JSON.parse(await response.text());
		expect(updatedPerson).toBeTruthy();
		expect(updatedPerson.maritalstatus).toBe("mariage");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/person/25", {
				name: "",
				email: "jane@example.com",

				gender: "female",
				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Name is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/person/25", {
				name: "Jane Doe",
				gender: "",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Gender is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/person/25", {
				name: "Jane Doe",
				gender: "female",
				birthDay: "",
				email: "jane@example.com",

				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Birthday is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/person/25", {
				name: "Jane Doe",
				gender: "female",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Marital status is required");
	});

	it("Should return a 404 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/person/999", {
				name: "Jane Doe",
				gender: "female",
				email: "jane@example.com",

				birthDay: "1990-01-01",
				maritalStatus: "single",
			}),
		);

		expect(response.status).toBe(404);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Person not found");
	});

	it("Should return a 500 error and error message", async () => {
		const body = {};
		const params = {};
		const set = {
			status: function (statusCode: number) {
				expect(statusCode).toBe(500);
				return {
					json: function (responseJson: any) {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await PersonController.updatePerson({ body, params, set });
	});
});

describe("DELETE /api/person/:id", () => {
	it.skip("Should return a 200 status code and message", async () => {
		const response = await app.handle(del("/api/person/25"));

		expect(response.status).toBe(200);
		const { message } = JSON.parse(await response.text());

		expect(message).toBe("Person deleted successfully");
	});

	it("Should return a 404 status code and an error message", async () => {
		const response = await app.handle(del("/api/person/999"));

		expect(response.status).toBe(404);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Person not found");
	});

	it("Should return a 500 error and error message", async () => {
		const params = {};
		const set = {
			status: function (statusCode: number) {
				expect(statusCode).toBe(500);
				return {
					json: function (responseJson: any) {
						expect(responseJson.error).toBe("Internal server error");
					},
				};
			},
		};

		await PersonController.deletePerson({ params, set });
	});
});

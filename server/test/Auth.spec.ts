import { describe, it, expect } from "bun:test";
import { app } from "../src";
import { AuthController } from "../src/controllers/AuthController";
import { post } from "./utils";

describe("POST /api/signup", () => {
	it.skip("Should register a new user successfully", async () => {
		const userData = {
			name: "larissa-mauro",
			email: "larissa-mauro@tuamaeaquelaursa.com",
			password: "password",
			confirm_password: "password",
		};

		const response = await app.handle(post("/api/signup", userData));

		expect(response.status).toBe(201);

		const { user } = JSON.parse(await response.text());
		expect(user).toBeTruthy();
	});

	it("Should return a 500 error and error message when failing to register a user", async () => {
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

		await AuthController.register({ body, set });
	});
});

describe("POST /api/login", () => {
	it("Should login successfully", async () => {
		const userData = {
			email: "larissa-mauro@tuamaeaquelaursa.com",
			password: "password",
		};

		const response = await app.handle(post("/api/login", userData));

		expect(response.status).toBe(200);
		const { token } = JSON.parse(await response.text());
		expect(token).toBeTruthy();
	});

	it("Should return a 401 error and error message when failing to login with invalid credentials", async () => {
		const userData = {
			email: "larissa-mauro@tuamaeaquelaursa.com",
			password: "wrong_password",
		};

		const response = await app.handle(post("/api/login", userData));

		expect(response.status).toBe(401);

		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Credenciais inválidas");
	});

	it("Should return a 500 error and error message when failing to login", async () => {
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

		await AuthController.login({ body, set });
	});
});

describe("POST /api/logout", () => {
	it("Should logout successfully", async () => {
		const response = await app.handle(post("/api/logout", {}));

		expect(response.status).toBe(200);

		const { message } = JSON.parse(await response.text());
		expect(message).toBe("Logout bem-sucedido");
	});

	it("Should return a 500 error and error message when failing to logout", async () => {
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

		await AuthController.logout({ body, set });
	});
});

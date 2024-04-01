import { describe, it, expect } from "bun:test";
import { app } from "../src";
import { AddressController } from "../src/controllers/AddressController";
import { del, post, put, req } from "./utils";

describe("GET /api/address", () => {
	it("should return a list of addresses", async () => {
		const response = await app.handle(req("/api/address/3"));

		expect(response.status).toBe(200);
		const { addresses } = JSON.parse(await response.text());
		expect(addresses).toBeTruthy();
	});
	
	it("should return a list of addresses with pagination", async () => {
		const response = await app.handle(req("/api/address?page=1&limit=2"));
		
		expect(response.status).toBe(200);
		const { addresses } = JSON.parse(await response.text());
		expect(addresses).toBeTruthy();
		expect(addresses.length).toBe(2);
	});

	it("should return a list of addresses with pagination and search", async () => {
		const response = await app.handle(
			req("/api/address?page=1&limit=2&search=Alfa"),
		);

		expect(response.status).toBe(200);
		const { addresses } = JSON.parse(await response.text());
		expect(addresses).toBeTruthy();
		expect(addresses.length).toBe(1);
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

		await AddressController.getAllAddresses({ query, set });
	});
});

describe("GET /api/address/:id", () => {
	it("Should return a 200 status code and the address object", async () => {
		const response = await app.handle(req("/api/address/1"));

		expect(response.status).toBe(200);
		const { address } = JSON.parse(await response.text());
		expect(address).toBeTruthy();
		expect(address.id).toBe(1);
		expect(address.street).toBe("Rua Alfa");
	});

	it("Should return a 404 status code and an error message", async () => {
		const response = await app.handle(req("/api/address/999"));

		expect(response.status).toBe(404);
		const { message } = JSON.parse(await response.text());
		expect(message).toBe("Address not found");
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

		await AddressController.getAddressById({ params, set });
	});
});

describe("POST /api/address", () => {
	it.skip("Should return a 201 status code and the created address object", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(201);
		const { newAddress } = JSON.parse(await response.text());
		expect(newAddress).toBeTruthy();
		expect(newAddress.street).toBe("Rua Doutor Luiz de Freitas Melro - lado par");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: undefined,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Person ID is required");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("CEP is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "89010025",
				street: "",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Street is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Number is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Neighborhood is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("City is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			post("/api/address", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("State is required");
	})

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

		await AddressController.createAddress({ body, set });
	});
});

describe("PUT /api/address/:id", () => {
	it("Should return a 200 status code and the updated address object", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "00000000",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(200);
		const { updatedAddress } = JSON.parse(await response.text());
		expect(updatedAddress).toBeTruthy();
		expect(updatedAddress.cep).toBe("00000000");
	});

	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: undefined,
				cep: "00000000",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Person ID is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("CEP is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "89010025",
				street: "",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Street is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Number is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Neighborhood is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "",
				state: "SC",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("City is required");
	})
	it("Should return a 400 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/3", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "",
			}),
		);

		expect(response.status).toBe(400);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("State is required");
	})

	it("Should return a 404 status code and an error message", async () => {
		const response = await app.handle(
			put("/api/address/999", {
				personid: 1,
				cep: "89010025",
				street: "Rua Doutor Luiz de Freitas Melro - lado par",
				number: "123",
				complement: "Casa",
				neighborhood: "Centro",
				city: "Blumenau",
				state: "SC",
			}),
		);

		expect(response.status).toBe(404);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Address not found");
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

		await AddressController.updateAddress({ body, params, set });
	});
});

describe("DELETE /api/address/:id", () => {
	it.skip("Should return a 200 status code and message", async () => {
		const response = await app.handle(del("/api/address/3"));

		expect(response.status).toBe(200);
		const { message } = JSON.parse(await response.text());

		expect(message).toBe("Address deleted successfully");
	});

	it("Should return a 404 status code and an error message", async () => {
		const response = await app.handle(del("/api/address/999"));

		expect(response.status).toBe(404);
		const { error } = JSON.parse(await response.text());
		expect(error).toBe("Address not found");
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

		await AddressController.deleteAddress({ params, set });
	});
});
 
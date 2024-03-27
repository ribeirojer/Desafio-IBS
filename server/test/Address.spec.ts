import { describe, it, expect } from "bun:test";
import { app } from "../src";
import { AddressController } from "../src/controllers/AddressController";
import { post } from "./utils";
/**
describe("POST /auth/register", () => {
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

    await AuthController.register({body, set});
  });
});

// Importando bibliotecas necessárias
const request = require('supertest');
const app = require('../app'); // Supondo que 'app' é o seu aplicativo Express.js

// Testes para rotas de Pessoa
describe('Testes para rotas de Pessoa', () => {
    // Teste para a rota de listagem de pessoas
    test('Deve retornar uma lista vazia de pessoas', async () => {
        const response = await request(app).get('/api/people');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    // Teste para a rota de criação de pessoa
    test('Deve criar uma nova pessoa', async () => {
        const newPerson = {
            nome: 'John Doe',
            sexo: 'Masculino',
            dataNascimento: '1990-01-01',
            estadoCivil: 'Solteiro',
            enderecos: []
        };
        const response = await request(app)
            .post('/api/people')
            .send(newPerson);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newPerson);
    });

    // Outros testes para rotas de Pessoa podem ser adicionados conforme necessário
});

// Testes para rotas de Endereço
describe('Testes para rotas de Endereço', () => {
    // Teste para a rota de listagem de endereços
    test('Deve retornar uma lista vazia de endereços', async () => {
        const response = await request(app).get('/api/addresses');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    // Teste para a rota de criação de endereço
    test('Deve criar um novo endereço', async () => {
        const newAddress = {
            cep: '12345-678',
            endereco: 'Rua Teste',
            numero: '123',
            complemento: 'Apto 101',
            bairro: 'Centro',
            estado: 'SP',
            cidade: 'São Paulo'
        };
        const response = await request(app)
            .post('/api/addresses')
            .send(newAddress);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newAddress);
    });

    // Outros testes para rotas de Endereço podem ser adicionados conforme necessário
});
 */
import { getAllPerson, getPersonById } from "../repositories/Person";

export class PersonController {
	public static async getAllPeople({ body, set }: any) {
		try {
			const people = await getAllPerson();

			set.status = 200;
			return { people };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async getPersonById({ body, set }: any) {
		try {
			const { id } = body;
			const people = await getPersonById(id);

			set.status = 200;
			return { people };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async createPerson({ body, set }: any) {
		try {
			const { nome, sexo, dataNascimento, estadoCivil, enderecos } = body;
			const people = await getAllPerson();

			set.status = 200;
			return { people };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async updatePerson({ body, set }: any) {
		try {
			const { id, nome, sexo, dataNascimento, estadoCivil, enderecos } = body;
			const people = await getAllPerson();

			set.status = 200;
			return { people };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async deletePerson({ body, set }: any) {
		try {
			const { id } = body;
			const people = await getAllPerson();

			set.status = 200;
			return { people };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}
}

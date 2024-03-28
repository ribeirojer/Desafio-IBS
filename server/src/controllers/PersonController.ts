import {
	createPerson,
	deletePerson,
	getAllPerson,
	getPersonById,
	updatePerson,
} from "../repositories/Person";

export class PersonController {
	public static async getAllPeople({ query, set }: any) {
		try {
			const { search, page, limit } = query;

			const searchQuery = search ? search : "";
			const pageQuery = page ? parseInt(page) : 1;
			const limitQuery = limit ? parseInt(limit) : 10;
			const offset = (pageQuery - 1) * limitQuery;

			const people = await getAllPerson(searchQuery, limitQuery, offset);

			set.status = 200;
			return { people };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async getPersonById({ params, set }: any) {
		try {
			const { id } = params;
			const person = await getPersonById(id);

			if (!person) {
				set.status = 404;
				return { error: "Person not found" };
			}

			set.status = 200;
			return { person };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async createPerson({ body, set }: any) {
		try {
			const { name, gender, birthDay, maritalStatus } = body;

			if (!name) {
				set.status = 400;
				return { error: "Name is required" };
			}
			if (!gender) {
				set.status = 400;
				return { error: "Gender is required" };
			}
			if (!birthDay) {
				set.status = 400;
				return { error: "Birthday is required" };
			}
			if (!maritalStatus) {
				set.status = 400;
				return { error: "Marital status is required" };
			}

			const person = await createPerson({
				name,
				gender,
				birthday: birthDay,
				maritalstatus: maritalStatus,
			});

			set.status = 201;
			return { person };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async updatePerson({ params, body, set }: any) {
		try {
			const { name, gender, birthDay, maritalStatus } = body;
			const { id } = params;

			if (!name) {
				set.status = 400;
				return { error: "Name is required" };
			}
			if (!gender) {
				set.status = 400;
				return { error: "Gender is required" };
			}
			if (!birthDay) {
				set.status = 400;
				return { error: "Birthday is required" };
			}
			if (!maritalStatus) {
				set.status = 400;
				return { error: "Marital status is required" };
			}
			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}

			const person = await getPersonById(id);

			if (!person) {
				set.status = 404;
				return { error: "Person not found" };
			}

			const updatedPerson = await updatePerson(id, {
				name,
				gender,
				birthday: birthDay,
				maritalstatus: maritalStatus,
			});

			set.status = 200;
			return { updatedPerson };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async deletePerson({ params, set }: any) {
		try {
			const { id } = params;

			const person = await getPersonById(id);

			if (!person) {
				set.status = 404;
				return { error: "Person not found" };
			}

			await deletePerson(id);

			set.status = 200;
			return { message: "Person deleted successfully" };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}
}

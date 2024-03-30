import {
	createAddress,
	deleteAddress,
	getAddressById,
	getAllAddresses,
	updateAddress,
} from "../repositories/Address";

export class AddressController {
	public static async getAllAddresses({ query, set }: any) {
		try {
			const { search, page, limit } = query;

			const searchQuery = search ? search : "";
			const pageQuery = page ? parseInt(page) : 1;
			const limitQuery = limit ? parseInt(limit) : 10;
			const offset = (pageQuery - 1) * limitQuery;

			const addresses = await getAllAddresses(searchQuery, limitQuery, offset);

			set.status = 200;
			return { addresses };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async getAddressById({ params, set }: any) {
		try {
			const { id } = params;

			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}

			if (isNaN(parseInt(id))) {
				set.status = 400;
				return { error: "ID must be a number" };
			}

			const address = await getAddressById(id);

			if (!address) {
				set.status = 404;
				return { message: "Address not found" };
			}

			set.status = 200;
			return { address };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async createAddress({ body, set }: any) {
		try {
			const { personid, cep, street, number, complement, neighborhood, state, city } =
				body;

				if (!personid) {
					set.status = 400;
					return { error: "Person ID is required" };
				}

			if (!cep) {
				set.status = 400;
				return { error: "CEP is required" };
			}
			if (!street) {
				set.status = 400;
				return { error: "Street is required" };
			}
			if (!number) {
				set.status = 400;
				return { error: "Number is required" };
			}

			if (!neighborhood) {
				set.status = 400;
				return { error: "Neighborhood is required" };
			}
			if (!state) {
				set.status = 400;
				return { error: "State is required" };
			}
			if (!city) {
				set.status = 400;
				return { error: "City is required" };
			}

			const newAddress = await createAddress({
				personid,
				cep,
				street,
				number,
				complement,
				neighborhood,
				city,
				state,
			}	);

			set.status = 201;
			return { newAddress };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async updateAddress({ params, body, set }: any) {
		try {
			const { id } = params;
			const { personid, cep, street, number, complement, neighborhood, state, city } =
				body;
				
			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}
			if (!personid) {
				set.status = 400;
				return { error: "Person ID is required" };
			}

		if (!cep) {
			set.status = 400;
			return { error: "CEP is required" };
		}
		if (!street) {
			set.status = 400;
			return { error: "Street is required" };
		}
		if (!number) {
			set.status = 400;
			return { error: "Number is required" };
		}

		if (!neighborhood) {
			set.status = 400;
			return { error: "Neighborhood is required" };
		}
		if (!state) {
			set.status = 400;
			return { error: "State is required" };
		}
		if (!city) {
			set.status = 400;
			return { error: "City is required" };
		}
			const address = await getAddressById(id);

			if (!address) {
				set.status = 404;
				return { error: "Address not found" };
			}

			const updatedAddress = await updateAddress(id, {
				personid,
				cep,
				street,
				number,
				complement,
				neighborhood,
				city,
				state,
			});

			set.status = 200;
			return { updatedAddress };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async deleteAddress({ params, set }: any) {
		try {
			const { id } = params;

			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}
			if (isNaN(parseInt(id))) {
				set.status = 400;
				return { error: "ID must be a number" };
			}

			const address = await getAddressById(id);
			
			if (!address) {
				set.status = 404;
				return { error: "Address not found" };
			}
			
			await deleteAddress(id);
			
			set.status = 200;
			return { message: "Address deleted successfully" };
        } catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}
}

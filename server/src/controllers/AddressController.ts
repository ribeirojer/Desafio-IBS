import {
	createAddress,
	deleteAddress,
	getAddressById,
	getAllAddresses,
	updateAddress,
} from "../repositories/Address";

export class AddressController {
	public static async getAllAddresses({ body, set }: any) {
		try {
			const addresses = await getAllAddresses();

			set.status = 200;
			return { addresses };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async getAddressById({ body, set }: any) {
		try {
			const { id } = body;

			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}
			const address = await getAddressById(id);

			if (!address) {
				set.status = 404;
				return { message: "" };
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
			const { cep, endereco, numero, complemento, bairro, estado, cidade } =
				body;

			if (!cep) {
				set.status = 400;
				return { error: "CEP is required" };
			}
			if (!endereco) {
				set.status = 400;
				return { error: "Endereço is required" };
			}
			if (!numero) {
				set.status = 400;
				return { error: "Número is required" };
			}
			if (!bairro) {
				set.status = 400;
				return { error: "Bairro is required" };
			}
			if (!estado) {
				set.status = 400;
				return { error: "Estado is required" };
			}
			if (!cidade) {
				set.status = 400;
				return { error: "Cidade is required" };
			}

			const newAddress = await createAddress({
				id: 0,
				street: "",
				city: "",
				state: "",
				zip: "",
			});
			set.status = 201;
			return { newAddress };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async updateAddress({ body, set }: any) {
		try {
			const { id } = body;
			const { cep, endereco, numero, complemento, bairro, estado, cidade } =
				body;

			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}

			const address = await getAddressById(id);

			if (!address) {
				set.status = 404;
				return { message: "Address not found" };
			}

			const updatedAddress = await updateAddress(id, {
				id: 0,
				street: "",
				city: "",
				state: "",
				zip: "",
			});

			set.status = 201;
			return { updateAddress };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	public static async deleteAddress({ body, set }: any) {
		try {
			const { id } = body;

			if (!id) {
				set.status = 400;
				return { error: "ID is required" };
			}

			await deleteAddress(id);
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}
}

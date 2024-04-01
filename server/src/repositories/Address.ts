import { IAddress } from "../interfaces/Address";
import { supabase } from "../utils/supabase";

export async function getAllAddresses(
	searchQuery: string,
	limitQuery: number,
	offset: number,
): Promise<IAddress[]> {
	let query = supabase
		.from("personaddress")
		.select("*")
		.range(offset, offset + limitQuery - 1);

	// Aplicar filtro de busca se a string de busca não estiver vazia
	if (searchQuery !== "") {
		query = query.ilike("street", `%${searchQuery}%`);
	}

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function getAddressesByPersonId(id: string): Promise<IAddress[]> {
	const { data, error } = await supabase
		.from("personaddress")
		.select("*")
		.eq("personid", id);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function getAddressById(id: string): Promise<IAddress> {
	const { data, error } = await supabase
		.from("personaddress")
		.select("*")
		.eq("id", id);

	if (error) {
		throw new Error(error.message);
	}
	const address: IAddress = data[0];

	return address;
}

export async function createAddress(address: IAddress): Promise<IAddress> {
	const { data, error } = await supabase
		.from("personaddress")
		.insert(address)
		.select("*");

	if (error) {
		throw new Error(error.message);
	}

	const addressCreated: IAddress = data[0];

	return addressCreated;
}

export async function updateAddress(
	id: string,
	address: IAddress,
): Promise<IAddress> {
	const { data, error } = await supabase
		.from("personaddress")
		.update(address)
		.eq("id", id)
		.select("*");

	if (error) {
		throw new Error(error.message);
	}

	const addressUpdated: IAddress = data[0];

	return addressUpdated;
}

export async function deleteAddress(id: string): Promise<void> {
	const { data, error } = await supabase
		.from("personaddress")
		.delete()
		.eq("id", id);

	if (error) {
		throw new Error(error.message);
	}

	return;
}

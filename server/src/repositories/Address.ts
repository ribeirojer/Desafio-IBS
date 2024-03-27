import { IAddress } from "../interfaces/Address";
import { supabase } from "../utils/supabase";

export async function getAllAddresses(): Promise<IAddress[]> {
	const { data, error } = await supabase.from("addresses").select("*");
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function getAddressById(id: string): Promise<IAddress> {
	const { data, error } = await supabase
		.from("addresses")
		.select("*")
		.eq("id", id)
		.single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function createAddress(address: IAddress): Promise<IAddress> {
	const { data, error } = await supabase
		.from("addresses")
		.insert(address)
		.single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function updateAddress(
	id: string,
	address: IAddress,
): Promise<void> {
	const { data, error } = await supabase
		.from("addresses")
		.update(address)
		.eq("id", id)
		.select("*");
	if (error) {
		throw new Error(error.message);
	}
	return;
}
export async function deleteAddress(id: string): Promise<void> {
	const { data, error } = await supabase
		.from("addresses")
		.delete()
		.eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return;
}

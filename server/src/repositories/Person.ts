import { supabase } from "../utils/supabase";

export async function getAllPerson(
	searchQuery: string,
	limitQuery: number,
	offset: number,
) {
	let query = supabase
		.from("person")
		.select("*")
		.range(offset, offset + limitQuery - 1);

	// Aplicar filtro de busca se a string de busca não estiver vazia
	if (searchQuery !== "") {
		query = query.ilike("name", `%${searchQuery}%`);
	}

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function getPersonById(id: string) {
	const { data, error } = await supabase
		.from("person")
		.select("*")
		.eq("id", id);

	if (error) {
		throw new Error(error.message);
	}

	return data[0];
}

export async function createPerson(person: any) {
	const { data, error } = await supabase
		.from("person")
		.insert(person)
		.select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data[0];
}

export async function updatePerson(id: string, person: any) {
	const { data, error } = await supabase
		.from("person")
		.update(person)
		.eq("id", id)
		.select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data[0];
}

export async function deletePerson(id: string) {
	const { data, error } = await supabase.from("person").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

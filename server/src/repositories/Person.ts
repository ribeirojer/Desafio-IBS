import { supabase } from "../utils/supabase";

export async function getAllPerson() {
	const { data, error } = await supabase.from("people").select("*");
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function getPersonById(id: string) {
	const { data, error } = await supabase
		.from("people")
		.select("*")
		.eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function createPerson(person: any) {
	const { data, error } = await supabase.from("people").insert(person);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function updatePerson(id: string, person: any) {
	const { data, error } = await supabase
		.from("people")
		.update(person)
		.eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function deletePerson(id: string) {
	const { data, error } = await supabase.from("people").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

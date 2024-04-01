import jwt from "jsonwebtoken"; // Biblioteca para geração de tokens JWT
import { supabase } from "../utils/supabase";
import { createPerson, getPersonByEmail } from "../repositories/Person";

export class AuthController {
	static async register({ body, set }: any) {
		try {
			const { name, email, password, confirm_password } = body;

			if (!name) {
				set.status = 400;
				return { error: "Name is required" };
			}
			if (!email) {
				set.status = 400;
				return { error: "Email is required" };
			}
			if (!password) {
				set.status = 400;
				return { error: "Password is required" };
			}
			if (!confirm_password) {
				set.status = 400;
				return { error: "Confirm password is required" };
			}

			// Criação do usuário no Supabase
			const { data, error } = await supabase.auth.signUp({ email, password });

			if (error) {
				throw new Error(error.message);
			}

			const { user, session } = data;

			const person = await createPerson({
				name,
				email,
				gender: "",
				birthDay: "",
				maritalStatus: "",
			});

			set.status = 201;
			return { user, session, person };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	static async login({ body, set }: any) {
		try {
			const { email, password } = body;

			if (!email) {
				set.status = 400;
				return { error: "Email is required" };
			}
			if (!password) {
				set.status = 400;
				return { error: "Password is required" };
			}

			const { data } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (!data.user) {
				set.status = 401;
				return { error: "Credenciais inválidas" };
			}

			const person = await getPersonByEmail(email);

			const token = jwt.sign({ userId: data.user.id }, "your_secret_key", {
				expiresIn: "1h",
			});

			set.status = 200;
			return { person, token };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}

	static async logout({ set }: any) {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) {
				throw new Error(error.message);
			}

			set.status = 200;
			return { message: "Logout bem-sucedido" };
		} catch (error) {
			console.error(error);
			set.status = 500;
			return { error: "Internal server error" };
		}
	}
}

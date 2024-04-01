import { IAddress } from "./Address";

export interface IPerson {
	name: string;
	email: string;
	gender: string;
	birthDay: string;
	maritalStatus: string;
	address?: IAddress[];
}

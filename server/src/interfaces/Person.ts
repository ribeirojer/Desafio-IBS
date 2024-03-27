import { IAddress } from "./Address";

export interface IPerson {
	id: number;
	name: string;
	gender: string;
	birthDay: string;
	maritalStatus: string;
	address: IAddress[];
}

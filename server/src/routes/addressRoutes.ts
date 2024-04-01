import Elysia from "elysia";
import { AddressController } from "../controllers/AddressController";

const router = new Elysia();

router.group("/api", (router) =>
	router
		.get("/address", AddressController.getAllAddresses)
		.get("/address/:id", AddressController.getAddressById)
		.post("/address", AddressController.createAddress)
		.put("/address/:id", AddressController.updateAddress)
		.delete("/address/:id", AddressController.deleteAddress)
		.get("/address/:id/person", AddressController.getAddressPerson)
);

export default router;

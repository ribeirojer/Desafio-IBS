import Elysia, { t } from "elysia";
import { AddressController } from "../controllers/AddressController";

const router = new Elysia();

router.group("/api", (router) =>
	router
		.get("/addresses", AddressController.getAllAddresses)
		.get("/addresses/:id", AddressController.getAddressById)
		.post("/addresses", AddressController.createAddress)
		.put("/addresses/:id", AddressController.updateAddress)
		.delete("/addresses/:id", AddressController.deleteAddress),
);

export default router;

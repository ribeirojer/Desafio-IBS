import Elysia, { t } from "elysia";
import { PersonController } from "../controllers/PersonController";

const router = new Elysia();

router.group("/api", (router) =>
	router
		.get("/person", PersonController.getAllPeople)
		.get("/person/:id", PersonController.getPersonById)
		.post("/person", PersonController.createPerson)
		.put("/person/:id", PersonController.updatePerson)
		.delete("/person/:id", PersonController.deletePerson),
);

export default router;

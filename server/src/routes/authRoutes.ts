import Elysia from "elysia";
import { AuthController } from "../controllers/AuthController";

const router = new Elysia();

router.group("/api", (router) =>
	router
		.post("/login", AuthController.login)
		.post("/signup", AuthController.register)
		.post("/logout", AuthController.logout),
);

export default router;

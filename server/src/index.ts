import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import addressRoutes from "./routes/addressRoutes";
import authRoutes from "./routes/authRoutes";
import personRoutes from "./routes/personRoutes";

const app = new Elysia()
	.use(cors())
	.use(addressRoutes)
	.use(authRoutes)
	.use(personRoutes);

const port = process.env.PORT || 3000;

app.listen(port);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export { app };

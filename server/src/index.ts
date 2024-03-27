import { Elysia } from "elysia";
import addressRoutes from "./routes/addressRoutes";
import personRoutes from "./routes/personRoutes";

const app = new Elysia();

app.use(personRoutes);
app.use(addressRoutes);

const port = process.env.PORT || 3000;

app.listen(port);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export { app };

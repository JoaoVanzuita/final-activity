import cors from "cors";
import express from "express";
import { errorMiddleware } from "./modules/middlewares/errorMiddleware";
import { routes } from "./routes";

const app = express()

app.use(express.json())
app.use(cors());
app.use(routes);

app.use(errorMiddleware)

export { app }

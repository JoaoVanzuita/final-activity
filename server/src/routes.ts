import { Router } from "express";
import { ProductController } from "./controllers/ProductController";
import { UserController } from "./controllers/UserController";

const routes = Router()

routes.post('/user', new UserController().create)

routes.post('/product', new ProductController().create)

export { routes }

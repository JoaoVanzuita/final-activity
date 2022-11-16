import { Router } from "express";
import { InvoiceController } from "./controllers/InvoiceController";
import { ProductController } from "./controllers/ProductController";
import { UserController } from "./controllers/UserController";

const routes = Router()

routes.post('/user', new UserController().create)
routes.get('/user', new UserController().findAll)
routes.get('/user/:id', new UserController().findById)
routes.get('/user/:userName', new UserController().findByName)

routes.post('/product', new ProductController().create)
routes.put('/product/:id', new ProductController().update)

routes.post('/invoice', new InvoiceController().create)

export { routes }

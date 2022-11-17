import { Router } from "express";
import { InvoiceController } from "./controllers/InvoiceController";
import { ProductController } from "./controllers/ProductController";
import { UserController } from "./controllers/UserController";

const routes = Router()

routes.post('/user', new UserController().create)
routes.get('/user', new UserController().findAll)
routes.get('/user/:id', new UserController().findById)
routes.get('/user/:name', new UserController().findByName)
routes.put('/user/:id', new UserController().update)
routes.delete('/user/:id', new UserController().delete)

routes.post('/product', new ProductController().create)
routes.get('/product', new ProductController().findAll)
routes.get('/product/:id', new ProductController().findById)
routes.get('/product/:name', new ProductController().findByName)
routes.put('/product/:id', new ProductController().update)
routes.delete('/product/:id', new ProductController().delete)

routes.post('/invoice', new InvoiceController().create)

export { routes }

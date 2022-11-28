import { Router } from "express";
import { InvoiceController } from "./modules/controllers/InvoiceController";
import { ProductController } from "./modules/controllers/ProductController";
import { UserController } from "./modules/controllers/UserController";
import { authMiddleware } from "./modules/middlewares/authMiddleware";

const routes = Router()

routes.post('/login', new UserController().login)

// routes.use(authMiddleware)

routes.get('/users/logged', new UserController().getLoggedUser)

routes.post('/users', new UserController().create)
routes.get('/users', new UserController().findAll)
routes.get('/users/name', new UserController().findByName)
routes.get('/users/:id', new UserController().findById)
routes.put('/users/:id', new UserController().update)
routes.delete('/users/:id', new UserController().delete)

routes.post('/products', new ProductController().create)
routes.get('/products', new ProductController().findAll)
routes.get('/products/name', new ProductController().findByName)
routes.get('/products/:id', new ProductController().findById)
routes.put('/products/:id', new ProductController().update)
routes.delete('/products/:id', new ProductController().delete)

routes.post('/invoices', new InvoiceController().create)

export { routes }

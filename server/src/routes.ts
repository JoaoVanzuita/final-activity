import { Router } from "express";
import { Product } from "./entities/Product";

const router = Router()

router.get('/user', (req, res) => {

  res.send('<h1>Hello World!</h1>')
})

export { router }

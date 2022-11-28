import { Request, Response } from "express";
import { ServerError } from "../errors/ServerError";
import { ProductService } from "../service/ProductService";

export class ProductController {
  async create(req: Request, res: Response) {

    if (!req.body.name) {
      throw new ServerError('no name specified')
    }

    const { name } = req.body

    const product = await new ProductService().create(name)

    return res.status(201).json({
      "data": product.id
    })
  }
  async findAll(req: Request, res: Response) {
    const products = await new ProductService().findAll()

    return res.json({
      "data": products
    })
  }
  async findById(req: Request, res: Response) {
    const id = req.params.id

    const product = await new ProductService().findById(id)

    if (!product) {
      throw new ServerError('product not found', 404)
    }

    return res.json({
      "data": product
    })
  }
  async findByName(req: Request, res: Response) {

    const name = <string>req.query.name

    const products = await new ProductService().findByName(name)

    if (products.length == 0) {
      throw new ServerError('no products found', 404)
    }

    return res.json({
      "data": products
    })
  }
  async update(req: Request, res: Response) {

    if (!req.body.name) {
      throw new ServerError('no name specified')
    }

    const { name } = req.body
    const id = req.params.id

    const product = await new ProductService().update(id, name)

    if (!product) {
      throw new ServerError('product not found', 404)
    }

    return res.json({
      "data": product.id
    })
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id

    const idDeleted = await new ProductService().delete(id)

    return res.json({
      "data": idDeleted
    })
  }
}

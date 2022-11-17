import { Request, Response } from "express";
import { ServerError } from "../errors/ServerError";
import { ProductService } from "../service/ProductService";

export class ProductController {
  async create(req: Request, res: Response) {

    const errors = []

    if (!req.body.name) {
      errors.push('no name specified')
    }
    if (!req.body.costPrice) {
      errors.push('no cost price specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { name, costPrice } = req.body

    const product = await new ProductService().create(name, costPrice)

    return res.status(201).json({
      "status": 201,
      "data": product.id
    })
  }
  async findAll(req: Request, res: Response) {
    const products = await new ProductService().findAll()

    return res.json({
      "status": 200,
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
      "status": 200,
      "data": product
    })
  }
  async findByName(req: Request, res: Response) {
    const name = req.params.name

    const products = await new ProductService().findByName(name)

    if (products.length == 0) {
      throw new ServerError('no products found', 404)
    }

    return res.json({
      "status": 200,
      "data": products
    })
  }
  async update(req: Request, res: Response) {
    const name = req.body
    const id = req.params.id

    if (!req.body.name) {
      throw new ServerError('no name specified')
    }

    const product = await new ProductService().update(id, name)

    if (!product) {
      throw new ServerError('product not found', 404)
    }

    return res.json({
      "status": 200,
      "data": product.id
    })
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id

    const idDeleted = await new ProductService().delete(id)

    return res.status(200).json({
      "status": 200,
      "data": idDeleted
    })
  }
}

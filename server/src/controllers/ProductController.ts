import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, costPrice } = req.body

    const product = await new ProductService().create(name, costPrice)

    return res.status(201).json({
      "status": 201,
      "data": product.id
    })
  }
  async update(req: Request, res: Response) {
    const name = req.body
    const id = req.params.id

    const product = await new ProductService().udpate(id, name)

    return res.status(200).json({
      "status": 200,
      "data": product.id
    })
  }
}

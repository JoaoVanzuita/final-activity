import { Request, Response } from "express";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, costPrice } = req.body

    const errors = []

    if (!name) {
      errors.push("no name specified")
    }
    if (!costPrice) {
      errors.push("no cost price specified")
    }
    if (errors.length) {
      return res.status(400).json({ "message": errors.join() })
    }

    try {
      const newProduct = ProductRepository.create({
        name,
        quantity: 0,
        costPrice,
        salePrice: costPrice * 1.1
      })

      await ProductRepository.save(newProduct)

      return res.status(201).json({ "message": newProduct.id })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal server error" })
    }
  }
}

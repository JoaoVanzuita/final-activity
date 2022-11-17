import { Like } from "typeorm";
import { Product } from "../entities/Product";
import { ServerError } from "../errors/ServerError";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {
  async create(name, costPrice): Promise<Product> {

    const product = ProductRepository.create({
      name,
      quantity: 0,
      costPrice,
      salePrice: costPrice * 1.1
    })
    await ProductRepository.save(product)

    return product
  }
  async findAll(): Promise<Product[]> {
    const products = ProductRepository.find()

    return products
  }
  async findById(id): Promise<Product> {

    const product = await ProductRepository.findOneBy({
      id
    })

    return product
  }
  async findByName(name: string): Promise<Product[]> {

    const products = await ProductRepository.findBy({
      name: Like(`%${name}%`)
    })

    return products
  }
  async update(id, name): Promise<Product> {

    const product = await ProductRepository.findOneBy({
      id
    })

    if (!product) {
      return null
    }

    product.name = name

    await ProductRepository.save(product)

    return product
  }
  async delete(id): Promise<number> {

    const product = await ProductRepository.findOneBy({
      id
    })

    if (!product) {
      throw new ServerError('product not found', 404)
    }

    await ProductRepository.delete({
      id
    })

    return id
  }
}

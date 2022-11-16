import { Product } from "../entities/Product";
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
  async udpate(id, name): Promise<Product> {

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
}

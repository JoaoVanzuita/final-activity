import { Like } from "typeorm";
import { Product } from "../entities/Product";
import { ServerError } from "../errors/ServerError";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {
  async create(name): Promise<Product> {

    const product = ProductRepository.create({
      name,
      quantity: 0,
      costPrice: 0,
      salePrice: 0
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
  async getAveragePrice(product: Product): Promise<number> {

    const result = await ProductRepository.query(`SELECT ROUND( AVG(unit_price), 2) AS averagePrice FROM invoice_itens as item
    INNER JOIN invoices as invoice
    on invoice.id = item.invoice_id
    WHERE item.product_id = $1 and invoice.type = 'purchase_invoice';
    `, [product.id])

    return Number(result[0].averageprice)
  }
  async updatePrice(id: number, costPrice: number): Promise<Product> {

    const product = await ProductRepository.findOneBy({
      id
    })

    product.costPrice = costPrice
    product.salePrice = costPrice * 1.1

    return await ProductRepository.save(product)
  }
  async updateInventory(id: number, quantity: number): Promise<Product> {

    const product = await ProductRepository.findOneBy({
      id
    })

    product.quantity += quantity

    return await ProductRepository.save(product)
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

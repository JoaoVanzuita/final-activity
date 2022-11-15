import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

export const ProductRepository = AppDataSource.getRepository(Product)

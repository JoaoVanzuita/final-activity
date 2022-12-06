import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Product } from '../src/modules/entities/Product'

export class Product1Seeder implements Seeder {

	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
		const productRepository = dataSource.getRepository(Product)

		const productData = {
			name: 'product 1',
		}

		const newProduct = productRepository.create(productData)
		await productRepository.save(newProduct)
	}
}

import { DataSource } from 'typeorm'
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension'
import { EmployeeUserSeeder } from './EmployeeUserSeeder'
import { ManagerUserSeeder } from './ManagerUserSeeder'
import { Product1Seeder } from './Product1Seeder'

export class MainSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

		await runSeeder(dataSource, ManagerUserSeeder)
		await runSeeder(dataSource, EmployeeUserSeeder)
		await runSeeder(dataSource, Product1Seeder)
	}

}

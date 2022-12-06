import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User, UserRole } from '../src/modules/entities/User'
import bcrypt from 'bcrypt'

export class EmployeeUserSeeder implements Seeder {

	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
		const userRepository = dataSource.getRepository(User)

		const userData = {
			name: 'funcionario',
			email: 'funcionario@gmail.com',
			password: await bcrypt.hash('padrao123', 10),
			role: UserRole.employee
		}

		const newUser = userRepository.create(userData)
		await userRepository.save(newUser)
	}
}

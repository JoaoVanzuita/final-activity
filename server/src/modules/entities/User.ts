import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum UserRole {
	manager = 'manager',
	employee = 'employee'
}

@Entity('users')
export class User {

	@PrimaryGeneratedColumn()
		id: number

	@Column({ length: 255 })
		name: string

	@Column({ length: 255, unique: true })
		email: string

	@Column({ length: 255, select: false })
		password: string

	@Column({ length: 255 })
		role: UserRole
}

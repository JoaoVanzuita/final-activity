import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

  @Column({ length: 255 })
  email: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 255 })
  role: UserRole

}

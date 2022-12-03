import { Like } from "typeorm";
import { User, UserRole } from "../entities/User";
import { ServerError } from "../errors/ServerError";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserService {
  async create(name: string, email: string, password: string, role: UserRole): Promise<User> {
    const userAlreadyExists = await UserRepository.findOneBy({
      email
    })

    if (userAlreadyExists) {
      throw new ServerError(`email user${email} is already registered`)
    }

    const user = UserRepository.create({
      name,
      email,
      password,
      role
    })

    await UserRepository.save(user)

    return user
  }
  async findAll(): Promise<User[]> {
    const users = await UserRepository.find()

    return users
  }
  async findById(id): Promise<User> {

    const user = await UserRepository.findOneBy({
      id
    })

    return user
  }
  async findByName(name: string): Promise<User[]> {

    const users = await UserRepository.findBy({
      name: Like(`%${name}%`)
    })

    return users
  }
  async updateUser(id, name, email, role): Promise<User> {

    const user = await UserRepository.findOneBy({
      id
    })

    if (!user) {
      return null
    }

    user.name = name
    user.email = email
    user.role = role

    await UserRepository.save(user)

    const newUser = await UserRepository.findOneBy({
      id
    })

    return newUser
  }
  async updateAccount(id, name, email, password): Promise<User> {

    const user = await UserRepository.findOneBy({
      id
    })

    if (!user) {
      return null
    }

    user.name = name
    user.email = email
    user.password = password

    await UserRepository.save(user)

    const newUser = await UserRepository.findOneBy({
      id
    })

    return newUser
  }
  async delete(id): Promise<number> {

    const user = await UserRepository.findOneBy({
      id
    })

    if (!user) {
      return null
    }

    await UserRepository.delete({
      id
    })

    return id
  }
  async login(email, password): Promise<string> {
    const user = await UserRepository.findOneBy({
      email
    })

    if (!user) {
      throw new ServerError('user not found', 404)
    }

    const result = await UserRepository
      .createQueryBuilder('user')
      .select('password')
      .where('user.id = :id', { id: user.id })
      .getRawOne()

    const verifyPassword = await bcrypt.compare(password, result.password)

    if (!verifyPassword) {
      throw new ServerError('invalid password')
    }

    const token = jwt.sign({
      id: user.id
    }, process.env.JWT_PASSWORD, {
      expiresIn: '8h'
    })

    return token
  }
}

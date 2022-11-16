import { Like } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  async create(name, email, password, role): Promise<User> {

    const user = UserRepository.create({
      name,
      email,
      password,
      role
    })

    await UserRepository.save(user)

    return user
  }
  async findByName(name: string): Promise<User[]> {

    const users = await UserRepository.findBy({
      name: Like(`%${name}%`)
    })

    return users
  }
}

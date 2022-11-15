import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService{
  async create(name, email, password, role): Promise<User>{

    const userAlreadyExists = await UserRepository.findOneBy({
      email
    })

    if(userAlreadyExists){
      
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
}

import { Request, Response } from "express";
import { Like } from "typeorm";
import { User, UserRole } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../service/UserService";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body

    const errors = []

    if (!name) {
      errors.push("no name specified")
    }
    if (!email) {
      errors.push("no email specified")
    }
    if (!password) {
      errors.push("no password specified")
    }
    if (!role) {
      errors.push("no role specified")
    }
    if (role != 'manager' && role != 'employee') {
      errors.push("invalid role value")
    }
    if (errors.length) {
      return res.status(400).json({ "message": errors.join() })
    }

    try {
      const user = await new UserService().create(
        name,
        email,
        password,
        role
      )

      return res.status(201).json({ "message": user.id })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal server error" })
    }
  }
  
  async findByName(req: Request, res: Response) {
    const name = req.params.userName

    if (!name) {
      return res.status(400).json({
        "message": "no name specified"
      })
    }

    try {
      const users = await UserRepository.findBy({
        name: Like(`%${name}%`)
      })

      if (users.length) {
        return res.json(users)
      }

      return res.status(404).json({
        "message": "user not found"
      })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal server error" })
    }
  }
}

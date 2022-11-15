import { Request, Response } from "express";
import { UserRole } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

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
      const newUser = UserRepository.create({
        name,
        email,
        password,
        role: UserRole[role]
      })

      await UserRepository.save(newUser)

      return res.status(201).json({ "message": newUser.id })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ "message": "Internal server error" })
    }
  }
}

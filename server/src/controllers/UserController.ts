import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../service/UserService";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body

    const user = await new UserService().create(
      name,
      email,
      password,
      role
    )

    return res.status(201).json({
      "status": 201,
      "data": user.id
    })
  }

  async findAll(req: Request, res: Response) {
    const users = await new UserService().findAll()

    return res.json({
      "status": 200,
      "data": users
    })
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id

    const user = await new UserService().findById(id)

    return res.json({
      "status": 200,
      "data": user
    })
  }

  async findByName(req: Request, res: Response) {
    const name = req.params.userName

    const users = await new UserService().findByName(name)

    return res.json({
      "status": 200,
      "data": users
    })
  }

  async update(req: Request, res: Response) {
    const { name, email, password } = req.body
    const id = req.params.id

    const user = await new UserService().update(id, name, email, password)

    return res.status(200).json({
      "status": 200,
      "data": user
    })
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id

    const idDeleted = await new UserService().delete(id)

    return res.status(200).json({
      "status": 200,
      "data": idDeleted
    })

  }
}

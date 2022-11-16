import { Request, Response } from "express";
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

  async findByName(req: Request, res: Response) {
    const name = req.params.userName

    const users = await new UserService().findByName(name)

    return res.json({
      "status": 200,
      "data": users
    })

  }
}

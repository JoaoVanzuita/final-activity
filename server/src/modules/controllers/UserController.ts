import { Request, Response } from "express";
import { ServerError } from "../errors/ServerError";
import { UserService } from "../service/UserService";
import bcrypt from 'bcrypt'

export class UserController {
  async create(req: Request, res: Response) {
    const errors = []

    if (!req.body.name) {
      errors.push('no name specified')
    }
    if (!req.body.email) {
      errors.push('no email specified')
    }
    if (!req.body.password) {
      errors.push('no password specified')
    }
    if (!req.body.role) {
      errors.push('no role specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { name, email, password, role } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await new UserService().create(
      name,
      email,
      encryptedPassword,
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

    if (!user) {
      throw new ServerError('user not found', 404)
    }

    return res.json({
      "status": 200,
      "data": user
    })
  }

  async findByName(req: Request, res: Response) {
    const name = req.params.name

    const users = await new UserService().findByName(name)

    if (users.length == 0) {
      throw new ServerError('no users found', 404)
    }

    return res.json({
      "status": 200,
      "data": users
    })
  }

  async update(req: Request, res: Response) {
    const errors = []

    if (!req.body.name) {
      errors.push('no name specified')
    }
    if (!req.body.email) {
      errors.push('no email specified')
    }
    if (!req.body.password) {
      errors.push('no password specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { name, email, password } = req.body
    const id = req.params.id

    const user = await new UserService().update(id, name, email, password)

    if (!user) {
      throw new ServerError('user not found', 404)
    }

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
  async login(req: Request, res: Response) {
    const errors = []

    if (!req.body.email) {
      errors.push('no email specified')
    }
    if (!req.body.password) {
      errors.push('no password specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { email, password } = req.body

    const token = await new UserService().login(email, password)

    return res.json({
      "status": 200,
      "token": token
    })
  }
  async getProfile(req: Request, res: Response) {

  }
}

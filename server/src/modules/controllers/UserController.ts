import { Request, Response } from 'express'
import { ServerError } from '../errors/ServerError'
import { UserService } from '../service/UserService'
import bcrypt from 'bcrypt'
import { UserRole } from '../entities/User'

export class UserController {
	async create(req: Request, res: Response) {

		if (req.user.role != UserRole.manager) {
			throw new ServerError('unauthorized user', 401)
		}

		const errors = []

		if (!req.body.name) {
			errors.push('no name specified')
		}
		if (!req.body.email) {
			errors.push('no email specified')
		}
		if (!req.body.role) {
			errors.push('no role specified')
		}
		if (errors.length) {
			throw new ServerError(errors.join())
		}

		const { name, email, role } = req.body

		const encryptedDefaultPassword = await bcrypt.hash('padrao123', 10)

		const user = await new UserService().create(
			name,
			email,
			encryptedDefaultPassword,
			role
		)

		return res.status(201).json({
			'id': user.id
		})
	}

	async findAll(req: Request, res: Response) {
		const users = await new UserService().findAll()

		return res.json({
			'users': users
		})
	}
	async findById(req: Request, res: Response) {
		const id = req.params.id

		const user = await new UserService().findById(id)

		if (!user) {
			throw new ServerError('user not found', 404)
		}

		return res.json({
			'user': user
		})
	}

	async findByName(req: Request, res: Response) {
		const name = <string>req.query.name

		const users = await new UserService().findByName(name)

		if (users.length == 0) {
			throw new ServerError('no users found', 404)
		}

		return res.json({
			'users': users
		})
	}

	async updateUser(req: Request, res: Response) {
		const errors = []

		if (!req.body.name) {
			errors.push('no name specified')
		}
		if (!req.body.email) {
			errors.push('no email specified')
		}
		if (errors.length) {
			throw new ServerError(errors.join())
		}

		const { name, email, role } = req.body
		const id = req.params.id

		const user = await new UserService().updateUser(id, name, email, role)

		if (!user) {
			throw new ServerError('user not found', 404)
		}

		return res.json({
			'id': user.id
		})
	}

	async updateAccount(req: Request, res: Response) {
		const errors = []

		if (!req.body.name) {
			errors.push('no name specified')
		}
		if (!req.body.password) {
			errors.push('no password specified')
		}
		if (!req.body.email) {
			errors.push('no email specified')
		}
		if (errors.length) {
			throw new ServerError(errors.join())
		}

		const { name, email, password } = req.body
		const id = req.params.id

		const encryptedPassword = await bcrypt.hash(password, 10)

		const user = await new UserService().updateAccount(id, name, email, encryptedPassword)

		if (!user) {
			throw new ServerError('user not found', 404)
		}

		return res.json({
			'id': user.id
		})
	}

	async delete(req: Request, res: Response) {
		const id = req.params.id

		const idDeleted = await new UserService().delete(id)

		return res.json({
			'id': idDeleted
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
			'token': token
		})
	}
	async getLoggedUser(req: Request, res: Response) {

		return res.json({
			'user': req.user
		})
	}
}

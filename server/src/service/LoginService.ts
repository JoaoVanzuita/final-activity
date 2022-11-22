import { Request } from 'express'
import { User } from '../entities/User';
import jwt from 'jsonwebtoken'
import { ServerError } from '../errors/ServerError';
import { JWTPayload } from '../types/JWTPayload';
import { UserRepository } from '../repositories/UserRepository';

export class LoginService {
  async validate(req: Request) {
    const { authorization } = req.headers

    if (!authorization) {
      throw new ServerError('unauthorized user', 401)
    }

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASSWORD) as JWTPayload

    const user = UserRepository.findOneBy({
      id
    })

    if (!user) {
      throw new ServerError('unauthorized user', 401)
    }
  }
}

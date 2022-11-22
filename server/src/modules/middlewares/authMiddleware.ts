import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { ServerError } from '../errors/ServerError';
import { JwtPayload } from '../../types/JwtPayload';
import { UserRepository } from '../repositories/UserRepository';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers

  if (!authorization) {
    throw new ServerError('unauthorized user', 401)
  }

  const token = authorization.split(' ')[1]

  const { id } = jwt.verify(token, process.env.JWT_PASSWORD) as JwtPayload

  const user = await UserRepository.findOneBy({
    id
  })

  if (!user) {
    throw new ServerError('unauthorized user', 401)
  }

  const {password:_, ...loggedUser} = user

  req.user = loggedUser

  next()
}

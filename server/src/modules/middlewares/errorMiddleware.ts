import { Request, Response, NextFunction } from 'express'
import { ServerError } from '../errors/ServerError'

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

	if (err instanceof ServerError) {
		res.status(err.statusCode).json({
			'message': err.message
		})
		return
	}

	res.status(500).json({
		'message': `Internal server error - ${err.message}`
	})
}

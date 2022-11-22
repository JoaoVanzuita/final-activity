import { Request, Response, NextFunction } from "express"
import { ServerError } from "../errors/ServerError"

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof ServerError) {
    res.status(err.statusCode).json({
      "status": err.statusCode,
      "message": err.message
    })
    return
  }

  res.status(500).json({
    "status": 500,
    "message": `Internal server error - ${err.message}`
  })
}

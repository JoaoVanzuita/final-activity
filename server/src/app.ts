import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ServerError } from "./errors/ServerError";
import { routes } from "./routes";

const app = express()

app.use(express.json())
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
})

export { app }

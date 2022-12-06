import cors from 'cors'
import express from 'express'
import { errorMiddleware } from './modules/middlewares/errorMiddleware'
import { routes } from './routes'
import swaggerUi from 'swagger-ui-express'

import swaggerDocs from '../docs/swagger.json'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/', express.static('./public'))

app.use(errorMiddleware)

export { app }

import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const PORT = <number | undefined><unknown>process.env.DB_PORT

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.ts`],
  migrations: [`${__dirname}/**/migrations/*.ts`]
})

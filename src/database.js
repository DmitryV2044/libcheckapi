import { configDotenv } from 'dotenv'
import Pool from 'pg' 

configDotenv()

const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD

const pool = new Pool.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
})

export default pool


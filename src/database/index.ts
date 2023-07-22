import { Pool } from 'pg'
import convig from "../utils/env.config"

const pool = new Pool({
  host: convig.PGHOST,
  database: convig.NODE_ENV === "dev"? convig.PGDATABASE : convig.PGDATABASETEST,
  port: parseInt(convig.PGPORT as string, 10), 
  user: convig.PGUSER,
  password: convig.PGPASSWORD,
  max: 20,
})

export default pool;
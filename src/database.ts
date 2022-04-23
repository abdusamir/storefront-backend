import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  ENV,
  POSTGRES_PORT,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string),
});
export default client;

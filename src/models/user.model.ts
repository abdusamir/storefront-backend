import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const salt_rounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const query = 'SELECT id,email,first_name,last_name FROM users';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('Could not get users from database');
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const query =
        'SELECT id,email,first_name, last_name FROM users WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't get user: ${id} from database`);
    }
  }
  async create(user: User): Promise<User | null> {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM users WHERE email= $1';
      const result = await conn.query(query, [user.email]);
      if (!result.rows.length) {
        const conn = await client.connect();
        const query1 =
          'INSERT INTO users (email,first_name,last_name,password) VALUES ($1, $2, $3, $4) RETURNING id,email,first_name,last_name';
        const hash = bcrypt.hashSync(
          (user.password as string) + (pepper as string),
          parseInt(salt_rounds as string)
        );
        const result1 = await conn.query(query1, [
          user.email,
          user.first_name,
          user.last_name,
          hash,
        ]);
        conn.release();
        return result1.rows[0];
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(
        `Couldn't insert user: ${user.first_name} into database ${e}`
      );
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const query = 'SELECT * from users WHERE email =$1';
      const result = await conn.query(query, [email]);
      conn.release();
      const user: User = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password as string))
        return {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        };
      return null;
    } catch (err) {
      throw new Error('Something went wrong. Please try again');
    }
  }
}

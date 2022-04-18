import client from '../database';
import dotenv from 'dotenv';
dotenv.config;

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};
export type OrderProducts = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};
export class OrderStore {
  async index(user_id: number, status: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const query = 'SELECT * from orders where user_id=$1 AND status=$2';
      const result = await conn.query(query, [user_id, status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't select user: ${user_id} order - ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<OrderProducts> {
    const conn = await client.connect();
    const query = `INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3,$4) RETURNING *`;
    const result = await conn.query(query, [quantity, order_id, product_id]);
    conn.release();
    return result.rows[0];
  }
}

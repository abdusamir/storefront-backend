import client from '../database';

export type Product = {
  id?: number;
  name: number;
  price: number;
  description: string;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM products';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('Cannot get products from database: ' + err);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product ${id} from database: ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const query =
        'INSERT INTO products(name,price,description,category) VALUES ($1,$2,$3,$4) RETURNING *';
      const result = await conn.query(query, [
        product.name,
        product.price,
        product.description,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot insert ${product.name} into database ${err}`);
    }
  }
  async showCategory(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM products WHERE category =$1';
      const result = await conn.query(query,[category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get category: ${category} error: ${err}`);
    }
  }
}

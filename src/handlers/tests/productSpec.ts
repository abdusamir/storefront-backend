import supertest from 'supertest';
import app from '../../index';
import client from '../../database';
import { Product } from '../../models/product.model';

const request = supertest(app);
let token = '';
describe('Testing product Endpoints', () => {
  const product: Product = {
    name: 'test',
    price: 10,
    description: 'test description', //
    category: 'test category',
  };
  beforeAll(async () => {
    const response = await request
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test@example.com', //
        first_name: 'John', //
        last_name: 'Smith', //
        password: 'password123',
      });
    token = response.body.token;
  });
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM users');
    await conn.query('DELETE FROM products');
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    conn.release();
  });
  it('[POST] /api/products with token', async () => {
    const response = await request
      .post('/api/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect(200);
    
    expect(response.body.data).toEqual({
      id: response.body.data.id,
      name: product.name,
      price: '10.00',
      description: product.description,
      category: product.category,
    });
  });
  it('[POST] /api/products without token', async ()=>{
      await request
      .post('/api/products')
      .set('Content-Type', 'application/json')
      .send(product)
      .expect(401);
  })
});

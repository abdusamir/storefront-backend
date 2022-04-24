import supertest from 'supertest';
import app from '../../index';
import client from '../../database';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { Order, OrderStore, OrderProducts } from '../../models/order.model';

const request = supertest(app);
let token = '';
const orderStore = new OrderStore();

describe('Testing Order routes', () => {
  const user: User = {
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Smith',
    password: 'password123',
  };
  const product: Product = {
    name: 'test',
    price: 12,
    description: 'test description',
    category: 'test',
  };
  const order: Order = {
    user_id: 1,
    status: 'open',
  };
  beforeAll(async () => {
    const response = await request.post('/api/users').send(user);
    token = response.body;
    await request.post('/api/products').send(product);
    const newOrder = await orderStore.create(1);
    order.id = newOrder.id;
    order.status = newOrder.status;
    order.user_id = newOrder.user_id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    conn.query('DELETE FROM order_products');
    conn.query('DELETE FROM orders');
    conn.query('DELETE FROM products');
    conn.query('DELETE FROM users');
    conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
    conn.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1');
    conn.release();
  });
});

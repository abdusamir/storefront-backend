import supertest from 'supertest';
import app from '../../index';
import client from '../../database';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { Order, OrderStore } from '../../models/order.model';

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
    const response = await request
      .post('/api/users')
      .send(user)
      .set('Content-Type', 'application/json');
    token = response.body.token;
    await request
      .post('/api/products')
      .send(product)
      .set('Authorization', 'Bearer ' + token);
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
  it('[GET] /api/orders/:userId with a token', async () => {
    const response = await request
      .get('/api/orders/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    console.log(response.body.orders);
    expect(response.body.orders.length).toBe(1);
    expect(response.body.orders[0].id).toBe(1);
    expect(parseInt(response.body.orders[0].user_id)).toBe(1);
    expect(response.body.orders[0].status).toEqual('open');
  });
  it('[GET] /api/orders/:userId with a token', async () => {
    await request
      .get('/api/orders/1')
      .set('Content-Type', 'application/json')
      .expect(401);
  });
  it('[POST] /api/orders/:uderId/create with a token', async () => {
    const response = await request
      .post('/api/orders/1/create')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.order).toEqual({
      id: 2,
      user_id: '1',
      status: 'open',
    });
  });
  it('[POST] /api/orders/:uderId/create without a token', async () => {
    await request
      .post('/api/orders/1/create')
      .set('Content-Type', 'application/json')
      .expect(401);
  });
  it('[POST] /api/orders/:userId/add_product with a token', async () => {
    const response = await request
      .post('/api/orders/1/add_product')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 3, product_id: 1, order_id: 1 })
      .expect(200);
    expect(response.body.data).toEqual({
      id: 1,
      quantity: 3,
      product_id: 1,
      order_id: 1,
    });
  });
  it('[POST] /api/orders/:userId/add_product without a token', async () => {
    await request
      .post('/api/orders/1/add_product')
      .set('Content-Type', 'application/json')
      .send({ quantity: 3, product_id: 1, order_id: 1 })
      .expect(401);
  });
});

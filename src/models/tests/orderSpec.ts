import { Order, OrderStore, OrderProducts } from '../order.model';
import { UserStore, User } from '../user.model';
import { ProductStore } from '../product.model';
import client from '../../database';

const orderModel = new OrderStore();

describe('Order model methods should be defined in order', () => {
  it('Index method should be defined in order', () => {
    expect(orderModel.index).toBeDefined();
  });
  it('create method should be defined in order', () => {
    expect(orderModel.create).toBeDefined();
  });
  it('addProduct method should be defined in order', () => {
    expect(orderModel.addProduct).toBeDefined();
  });
});

describe('Testing order model methods logic', () => {
  const order: Order = {
    status: 'open',
    user_id: 1,
  };
  beforeAll(async () => {
    const userStore = new UserStore();
    const productStore = new ProductStore();
    const user: User = (await userStore.create({
      email: 'user@example.com', //
      first_name: 'John',
      last_name: 'Smith', //
      password: 'password123',
    })) as User;
    await productStore.create({
      name: 'test',
      price: 12.5,
      description: 'This is a test description',
      category: 'This is a test category',
    });
    const createdOrder = await orderModel.create(user.id as number);
    order.status = createdOrder.status;
    order.id = createdOrder.id;
    order.user_id = createdOrder.user_id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM products');
    await conn.query('DELETE FROM users');
    await conn.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1');
    await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    conn.release();
  });
  it('Create should return a new order', async () => {
    const newOrder = await orderModel.create(order.user_id);
    expect(newOrder).toEqual({
      id: newOrder.id,
      status: 'open',
      user_id: order.user_id,
    });
  });
  it('Index show return all complete orders', async () => {
    const orders = await orderModel.index(order.user_id, 'complete');
    expect(orders.length).toEqual(0);
  });
  it('index show return all open orders', async () => {
    const orders = await orderModel.index(order.user_id, 'open');
    expect(orders.length).toEqual(2);
  });
  it('addProduct should return a new order-product relation', async () => {
    const orderProduct: OrderProducts = await orderModel.addProduct(
      3,
      order.id as number,
      1
    );
    expect(orderProduct).toEqual({
      id: orderProduct.id,
      quantity: 3,
      order_id: order.id as number,
      product_id: 1,
    });
  });
});

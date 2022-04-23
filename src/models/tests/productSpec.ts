import { Product, ProductStore } from '../product.model';
import client from '../../database';

const productModel = new ProductStore();

describe('Product model methods should be defined', () => {
  it('testing index method to be defined', () => {
    expect(productModel.index).toBeDefined();
  });
  it('testing show method to be defined', () => {
    expect(productModel.show).toBeDefined();
  });
  it('testing create method to be defined', () => {
    expect(productModel.create).toBeDefined();
  });
  it('testing showCategory method to be defined', () => {
    expect(productModel.showCategory).toBeDefined();
  });
});

describe('Testing product model methods logic', () => {
  const product: Product = {
    name: 'test',
    price: 12.5,
    description: 'This is a test description',
    category: 'This is a test category',
  };
  beforeAll(async () => {
    const createdProduct = await productModel.create(product);
    product.id = createdProduct.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM products');
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    conn.release();
  });
  it('Create should return a new product', async () => {
    const newProduct = await productModel.create({
      name: 'test',
      price: 12.5,
      description: 'This is a test description',
      category: 'This is a test category',
    });
    newProduct.price = parseFloat(newProduct.price as unknown as string);
    expect(newProduct).toEqual({
      id: newProduct.id,
      name: 'test',
      price: 12.5,
      description: 'This is a test description',
      category: 'This is a test category',
    });
  });
  it('Index method should return all products', async () => {
    const products = await productModel.index();
    expect(products.length).toBe(2);
  });
  it('Show method should return the correct product', async () => {
    const productShow: Product = await productModel.show(product.id as number);
    productShow.price = parseFloat(productShow.price as unknown as string);
    expect(productShow).toEqual(product);
  });
  it('showCategory should return all the products in the category', async () => {
    const products = await productModel.showCategory(product.category);
    expect(products.length).toBe(2);
  });
});

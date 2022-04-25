import { Product, ProductStore } from '../models/product.model';
import { Request, Response, Application } from 'express';
import verifyAuth from '../middlewares/verifyAuth';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  try{
  res.status(200).json({
    status: 200,
    data: products,
    message: 'Request was successful',
  });
}catch(err){
  res.status(400).json('Something went wrong, could not return products');
}
};
const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await store.show(parseInt(id));
  try{
  if (product) {
    res.status(200).json({
      status: 200,
      data: product,
      message: 'Request was successful',
    });
  } else {
    res.status(404).json({
      message: 'Product does not exist',
    });
  }
} catch(err){
  res.status(400).json('Something went wrong');
}
};
const create = async (req: Request, res: Response) => {
  const product: Product = req.body;
  try {
    const p = await store.create(product);
    res.status(200).json({
      status: 200,
      data: p,
      message: 'Request was successful',
    });
  } catch (err) {
    res.status(400).send('Something went wrong :(');
  }
};
const showCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  const products: Product[] = await store.showCategory(category);
  try{
  if (products.length > 0) {
    res.status(200).json({
      status: 200,
      data: products,
      message: 'Request was successful',
    });
  } else {
    res
      .status(404)
      .json({ message: `Whoops! category ${category} does not exist` });
  }
} catch(err) {
  res.status(400).json('Could not complete request');
}
};

const productRoutes = (app: Application) => {
  app.get('/api/products', index);
  app.get('/api/products/:id', show);
  app.get('/api/products/category/:category', showCategory);
  app.post('/api/products', verifyAuth, create);
};
export default productRoutes;

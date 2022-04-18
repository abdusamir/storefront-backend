import { Order, OrderStore, OrderProducts } from '../models/order.model';
import verifyAuth from '../middlewares/verifyAuth';
import { Request, Response, Application } from 'express';

const store = new OrderStore();

const CurrentOrders = async (req: Request, res: Response) => {
  const id = req.params.user_id;
  try {
    const orders: Order[] = await store.index(parseInt(id), 'open');
    if (orders.length) {
      res.status(200).json({
        status: 200,
        orders: { ...orders },
        message: 'Order returned successfully',
      });
    } else {
      //
      res.status(404).json({
        message: 'There are no current orders available',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

const completeOrders = async (req: Request, res: Response) => {
  const id = req.params.user_id;
  try {
    const orders: Order[] = await store.index(parseInt(id), 'complete');
    if (orders.length) {
      res.status(200).json({
        status: 200,
        orders: { ...orders },
        message: 'Order returned successfully',
      });
    } else {
      //
      res.status(404).json({
        message: 'There are no completed orders orders available',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const order_id = req.params.orderId;
  const product_id = req.params.productId;
  const quantity = req.query.quantity;
  try {
    const orderProduct: OrderProducts = await store.addProduct(
      parseInt(quantity as unknown as string),
      parseInt(order_id),
      parseInt(product_id)
    );
    res.status(200).json({
      status: 200,
      data: orderProduct,
      message: 'item added to order successfully',
    });
  } catch (err) {
    res.status(400).json({
      message: 'something went wrong',
    });
  }
};

const orderRoutes = (app: Application) => {
  app.get('/api/orders/:user_id', CurrentOrders);
  app.get('/api/orders/:user_id/complete', completeOrders);
  app.post(
    '/api/orders/:order_id/add_product/:product_id',
    verifyAuth,
    addProduct
  );
};

export default orderRoutes;

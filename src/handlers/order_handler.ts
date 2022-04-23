import { Order, OrderStore, OrderProducts } from '../models/order.model';
import { verifyUser } from '../middlewares/verifyAuth';
import { Request, Response, Application } from 'express';

const store = new OrderStore();

const CurrentOrders = async (req: Request, res: Response) => {
  const id = req.params.userId;
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
  const id = req.params.userId;
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
  //const user_id = req.params.userId;
  const { order_id, product_id, quantity } = req.body;
  try {
    const orderProduct: OrderProducts = await store.addProduct(
      parseInt(quantity),
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
const create = async (req: Request, res: Response) => {
  const user_id = req.params.userId;
  try {
    const order: Order = await store.create(parseInt(user_id));
    res.status(200).json({
      status: 200,
      order: order,
      message: 'Order created successfully',
    });
  } catch (err) {
    res.status(400).json({ message: 'Could not create order' });
  }
};
const orderRoutes = (app: Application) => {
  app.get('/api/orders/:userId', verifyUser, CurrentOrders);
  app.get('/api/orders/:userId/complete', verifyUser, completeOrders);
  app.post('/api/orders/:userId/add_product/', verifyUser, addProduct);
  app.post('/api/users/:userId/orders/create', verifyUser, create);
};

export default orderRoutes;

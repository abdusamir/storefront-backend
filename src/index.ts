import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware';
import productRoutes from './handlers/products_handler';
import userRoutes from './handlers/user_handler';
import orderRoutes from './handlers/order_handler';

dotenv.config();
const PORT = process.env.PORT || 3030;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to storefront API from Fullstack Nanodegree',
  });
});
productRoutes(app);
userRoutes(app);
orderRoutes(app);
app.use(errorMiddleware);
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Endpoint not found, wront URL',
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
export default app;

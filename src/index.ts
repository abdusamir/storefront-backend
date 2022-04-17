import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3030;

const app: Application = express();
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to storefront API from Fullstack Nanodegree',
  });
});
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

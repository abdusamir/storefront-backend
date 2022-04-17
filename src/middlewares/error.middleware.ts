import { Request, Response, NextFunction } from 'express';

interface Error {
  message?: string;
  name?: string;
  status?: number;
  stack?: string;
}
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong :(';
  res.status(status).send(message);
  next();
};

export default errorMiddleware;

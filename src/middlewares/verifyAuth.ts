import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
dotenv.config();

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeaders = req.headers.authorization as string;
    const token = authorizationHeaders.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorize request' });
  }
};
export default verifyAuth;

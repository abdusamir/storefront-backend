import jwt from 'jsonwebtoken';
import { Response, Request, Application } from 'express';
import dotenv from 'dotenv';
import { User, UserStore } from '../models/user.model';
import verifyAuth from '../middlewares/verifyAuth';
dotenv.config();
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users: User[] = await store.index();
  try{
  res.status(200).json({
    status: 200,
    users: users,
    message: 'Request was completed successfully',
  });
}catch(err){
  res.status(400).json({
    message: 'could now return users'
  });
}
};

const create = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const usr = await store.create(user);
    if (usr !== null) {
      const token = jwt.sign({ user: usr }, process.env.TOKEN_SECRET as string);
      res.status(200).json({
        status: 200,
        token: token,
        message: 'User created successfully',
      });
    } else {
      res.status(422).json({ message: 'Email is already in use' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'User was not created',
    });
  }
};
const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user: User = await store.show(parseInt(id));
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
        message: 'User returned successfully',
      });
    } else {
      res.status(404).json({
        message: 'User does not exist',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Couldn't retrieve user",
    });
  }
};
const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User | null = await store.authenticate(email, password);
    if (user) {
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
      res.status(200).json(token);
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
const userRoutes = (app: Application) => {
  app.get('/api/users', verifyAuth, index);
  app.post('/api/users', create);
  app.get('/api/users/:id', verifyAuth, show);
  app.post('/api/users/authenticate', authenticate);
};
export default userRoutes;

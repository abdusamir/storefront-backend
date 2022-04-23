import { User, UserStore } from '../user.model';
import client from '../../database';

const userModel = new UserStore();

describe('UserStore methods check if defined', () => {
  it('Index method check if defined', () => {
    expect(userModel.index).toBeDefined();
  });
  it('Show method check if defined', () => {
    expect(userModel.show).toBeDefined();
  });
  it('Create method check if defined', () => {
    expect(userModel.create).toBeDefined();
  });
  it('Authenticate method check if defined', () => {
    expect(userModel.authenticate).toBeDefined();
  });
});
describe('Testing user model methods', () => {
  const user: User = {
    email: 'user@example.com',
    first_name: 'Abdelrahman',
    last_name: 'Ahmed',
    password: 'password123',
  };
  beforeAll(async () => {
    const createdUser: User = (await userModel.create(user)) as User;
    user.id = createdUser.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM users');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    conn.release();
  });
  it('Create method should return a new user', async () => {
    const createdUser: User = (await userModel.create({
      email: 'user3@example.com',
      first_name: 'Abdelrahman',
      last_name: 'Ahmed',
      password: 'password123',
    })) as User;
    expect(createdUser).toEqual({
      id: createdUser.id,
      email: 'user3@example.com',
      first_name: 'Abdelrahman',
      last_name: 'Ahmed',
    });
  });
  it('Show should return a user', async () => {
    const userShow = await userModel.show(user.id as number);
    expect(userShow).toEqual({
      id: user.id as number,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  });
  it('Index should return all available users in the database', async () => {
    const users = await userModel.index();
    expect(users.length).toEqual(2);
  });
  it('expect authenticate to return the correct user', async () => {
    const userAuth = await userModel.authenticate(
      user.email as string,
      user.password as string
    );
    expect(userAuth).toEqual({
      id: user.id, //
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  });
});

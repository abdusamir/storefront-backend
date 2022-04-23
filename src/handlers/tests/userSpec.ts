import supertest from 'supertest';
import app from '../../index';
import { User, UserStore } from '../../models/user.model';
import client from '../../database';

const request = supertest(app);
const userStore = new UserStore();
let token = '';

describe('api/users Endpoint testing', () => {
  const user: User = {
    email: 'user2@example.com',
    first_name: 'Abdelrahman',
    last_name: 'Ahmed',
    password: 'password123',
  };
  beforeAll(async () => {
    const createdUser: User = (await userStore.create(user)) as User;
    user.id = createdUser.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM users');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    conn.release();
  });
  describe('Testing authenticate route', async () => {
    it('Authenticate with correct parameters', async () => {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({
          email: 'user2@example.com',
          password: 'password123',
        })
        .expect(200);
      token = response.body;
      console.log(token);
    });
  });
});

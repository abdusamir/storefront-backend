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
  describe('[POST] /api/users/authenticate', async () => {
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
    });
    it('Authenticate with incorrect credentials', async () => {
      await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({
          email: 'user2@example.com',
          password: 'password13',
        })
        .expect(401);
    });
  });
  describe('Testing CRUD Endpoints', () => {
    it('[GET] /api/users with token', async () => {
      const response = await request
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(response.body.users.length).toEqual(1);
    });
    it('[GET] /api/users without token', async () => {
      await request
        .get('/api/users')
        .set('content-type', 'application/json')
        .expect(401);
    });
    it('[POST] /api/users with correct email', async () => {
      const response = await request
        .post('/api/users')
        .send({
          email: 'foo@bar.com',
          first_name: 'John',
          last_name: 'Smith',
          password: 'password123',
        })
        .expect(200);
      expect(response.body.status).toEqual(200);
    });
    it('[POST] /api/users with already existing email', async () => {
      const response = await request.post('/api/users').send({
        email: 'user2@example.com',
        first_name: 'Abdelrahman',
        last_name: 'Ahmed',
        password: 'password123',
      });
      expect(response.status).toBe(422);
    });
    it('[GET] /api/users/:id with token', async () => {
      const response = await request
        .get('/api/users/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    });
    it('[GET] /api/users/:id without token', async () => {
      const response = await request
        .get('/api/users/1')
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(401);
    });
  });
});

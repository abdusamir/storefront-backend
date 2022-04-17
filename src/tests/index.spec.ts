import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

it('testing GET / ', async () => {
  const response = await request.get('/');
  expect(response.status).toEqual(200);
});

import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

it('[GET] / endpoint', async () => {
  const response = await request.get('/');
  expect(response.status).toEqual(200);
});

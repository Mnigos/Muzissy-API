import request from 'supertest';
import app from '../app';

describe('Index endpoint', () => {
  it('Should return OK', async () => {
    await request(app).get('/').expect(200);
  });
});

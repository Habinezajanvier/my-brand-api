import request from 'supertest';
import app from '../src/app';

describe('welcoming route', () => {
  it('Should return 200 if successfully reach on', async (done) => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('msg');
    done();
  });
});

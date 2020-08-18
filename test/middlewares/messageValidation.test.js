import request from 'supertest';
import app from '../../src/app';

describe('Message validations', () => {
  it('Should return an error if names are empty', async (done) => {
    const message = {
      names: ' ',
      email: 'email@example.com',
      message: 'Hey, This is message for testing'
    };
    const res = await request(app).post('/messages').send(message);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/names/i);
    expect(res.body.error).toMatch(/required/i);
    done();
  });
  it('Should return an error if names are very short', async (done) => {
    const user = {
      names: 'na',
      email: 'email@example.com',
      message: 'Hey, This is message for testing'
    };
    const res = await request(app).post('/messages').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/valid/i);
    expect(res.body.error).toMatch(/names/i);
    done();
  });
});

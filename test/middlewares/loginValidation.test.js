import request from 'supertest';
import app from '../../src/app';

describe('Login validations', () => {
  it('Should show an error if email is not provided', async (done) => {
    const user = {
      email: '',
      password: 'password123'
    };
    const res = await request(app).post('/user/login').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/email/i);
    expect(res.body.error).toMatch(/required/i);
    done();
  });
  it('Should show an error if email is not a valid email', async (done) => {
    const user = {
      email: 'anyInvalidEmail',
      password: 'password123'
    };
    const res = await request(app).post('/user/login').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/email/i);
    expect(res.body.error).toMatch(/valid/i);
    done();
  });
  it('Should return error if Password is not provided', async (done) => {
    const user = {
      email: 'email@example.com',
      password: ''
    };
    const res = await request(app).post('/user/login').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/password/i);
    expect(res.body.error).toMatch(/required/i);
    done();
  });
  it("Should return an error if Password is doesn't have numbers", async (done) => {
    const user = {
      email: 'email@example.com',
      password: 'password'
    };
    const res = await request(app).post('/user/login').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/password/i);
    expect(res.body.error).toMatch(/numbers/i);
    done();
  });
});

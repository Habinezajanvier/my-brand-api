import request from 'supertest';
import app from '../../src/app';

describe('signupvalidation', () => {
  it('Should show an error if names are empty', async (done) => {
    const user = {
      fullNames: '',
      email: 'email@example.com',
      password: 'password123'
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/required/i);
    expect(res.body.error).toMatch(/names/i);
    done();
  });
  it('Should show an error if names if very short', async (done) => {
    const user = {
      fullNames: 'na',
      email: 'email@example.com',
      password: 'password123'
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/valid/i);
    expect(res.body.error).toMatch(/names/i);
    done();
  });
  it('Should show an error if email is not provided', async (done) => {
    const user = {
      fullNames: 'fullnames',
      email: '',
      password: 'password123'
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/email/i);
    expect(res.body.error).toMatch(/required/i);
    done();
  });
  it('Should show an error if email is not a valid email', async (done) => {
    const user = {
      fullNames: 'fullnames',
      email: 'anyInvalidEmail',
      password: 'password123'
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/email/i);
    expect(res.body.error).toMatch(/valid/i);
    done();
  });
  it('Should return error if Password is not provided', async (done) => {
    const user = {
      fullNames: 'fullnames',
      email: 'email@example.com',
      password: ''
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/password/i);
    expect(res.body.error).toMatch(/required/i);
    done();
  });
  it("Should return an error if Password is doesn't have numbers", async (done) => {
    const user = {
      fullNames: 'fullnames',
      email: 'email@example.com',
      password: 'password'
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/password/i);
    expect(res.body.error).toMatch(/numbers/i);
    done();
  });
});

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../../src/app';
import { url } from '../../../src/models/connection';
import User from '../../../src/models/user';
import hashPassword from '../../../src/helpers/hashPwd';

describe('/Login', () => {
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  beforeEach(async () => {
    const password = await hashPassword('password');
    const user = {
      fullNames: 'fullname',
      email: 'email@example.com',
      password
    };
    const newUser = new User(user);
    await newUser.save();
  });
  afterEach(async () => {
    await User.deleteMany();
  });
  it('Should return 404 if no account found', async (done) => {
    const user = {
      email: 'otherEmail@example.com',
      password: 'password'
    };
    const res = await request(app).post('/user/login').send(user);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('msg');
    done();
  });
  it('Should return 400 if password is invalid', async (done) => {
    const user = {
      email: 'email@example.com',
      password: 'wrongPassword'
    };
    const res = await request(app).post('/user/login').send(user);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('msg');
    expect(res.body.msg).toMatch(/invalid/i);
    done();
  });
  it('Should return 200 if successeffully loged in', async (done) => {
    const cred = {
      email: 'email@example.com',
      password: 'password'
    };
    const res = await request(app).post('/user/login').send(cred);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', cred.email);
    done();
  });
});

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app';
import User from '../../../src/models/user';
import { url } from '../../../src/models/connection';

describe('/signup', () => {
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterEach(async () => {
    await User.deleteMany();
  });
  it('Should return 409 if user exist', async (done) => {
    const user = {
      fullNames: 'fullname',
      email: 'email@example.com',
      password: 'password',
    };
    const newUser = new User(user);
    await newUser.save();

    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('msg');
    done();
  });
  it('Should return 201 if user created successfully', async (done) => {
    const user = {
      fullNames: 'fullname',
      email: 'email@example.com',
      password: 'password',
    };
    const res = await request(app).post('/user/signup').send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', user.email);
    done();
  });
});

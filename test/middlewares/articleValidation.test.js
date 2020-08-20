import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import { url } from '../../src/models/connection';
import createToken from '../../src/helpers/generateToken';

describe('Article Validation', () => {
  let authToken;
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  beforeEach(() => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      fullNames: 'fullnames',
      email: 'email@example.com',
      isAdmin: true
    };
    authToken = createToken(user);
  });
  it('Should return an error if title is empty', async (done) => {
    const article = {
      title: ' ',
      body: 'The article used for testing my application'
    };
    const res = await request(app)
      .post('/articles')
      .set('auth-token', authToken)
      .send(article);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('Should return an error if data provided during update are invalid', async (done) => {
    const id = mongoose.Types.ObjectId().toHexString();
    const article = {
      title: ' ',
      body: 'the article used for testing my application'
    };
    const res = await request(app)
      .put(`/articles/${id}`)
      .set('auth-token', authToken)
      .send(article);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    done();
  });
});

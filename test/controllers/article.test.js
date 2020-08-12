import app from '../../src/app';
import request from 'supertest';
import mongoose from 'mongoose';
import Article from '../../src/models/article';
import { url } from '../../src/models/connection';

describe('Article Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterEach(async () => {
    await Article.deleteMany();
  });

  describe('POST request', () => {
    it('Should return 201 if the article created successfully', async (done) => {
      const article = {
        title: 'title of article',
        body: 'body of the article',
      };
      const res = await request(app).post('/articles').send(article);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result.title).toBe(article.title);
      done();
    });
  });
  describe('GET request', () => {
    it('Should return 200 if documents found', async (done) => {
      const article = new Article({
        title: 'title of article',
        body: 'body of the article',
      });
      await article.save();

      const res = await request(app).get('/articles');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      done();
    });
  });
});

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app';
import { url } from '../../../src/models/connection';
import Article from '../../../src/models/articles';
import createToken from '../../../src/helpers/generateToken';

describe('/Articles', () => {
  let authToken;
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  afterEach(async () => {
    await Article.deleteMany();
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
  const article = {
    title: 'Article for testing',
    body: 'This is the article I wrote during testing'
  };
  const exec = () => request(app)
    .post('/articles')
    .send(article)
    .set('auth-token', authToken);
  describe('Create Article', () => {
    it('Should create a new article in database', async (done) => {
      const res = await request(app)
        .post('/articles')
        .set('auth-token', authToken)
        .send(article);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('msg');
      expect(res.body).toHaveProperty('savedArticle');
      expect(res.body.savedArticle).toMatchObject(article);
      done();
    });
  });
  describe('Read all articles', () => {
    it('Should return 404, if no article found', async (done) => {
      const res = await request(app).get('/articles').set('auth-token', authToken);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/no article/i);
      done();
    });
    it('Should return all articles found in database', async (done) => {
      await exec();
      const res = await request(app).get('/articles').set('auth-token', authToken);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      done();
    });
  });
  describe('Read single article', () => {
    it('Should return 404, if the article of provided id doesn\'t found', async (done) => {
      const id = mongoose.Types.ObjectId().toHexString();
      const res = await request(app).get(`/articles/${id}`).set('auth-token', authToken);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/no article/i);
      done();
    });
    it('Should return saved article if _id provided is found', async (done) => {
      const newArticle = await exec();
      const id = newArticle.body.savedArticle._id;
      const res = await request(app).get(`/articles/${id}`).set('auth-token', authToken);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(newArticle.body.savedArticle);
      done();
    });
  });
  describe('Update article', () => {
    const field = {
      title: 'updated title in testing',
      body: 'updated body of the article in testing'
    };
    it('Should return 404, if the article is not found', async (done) => {
      const id = mongoose.Types.ObjectId().toHexString();
      const res = await request(app)
        .put(`/articles/${id}`)
        .set('auth-token', authToken)
        .send(field);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/no article/i);
      done();
    });
    it('Should return the updated data if updated successfully', async (done) => {
      const savedArticle = await exec();
      const id = savedArticle.body.savedArticle._id;
      const res = await request(app)
        .put(`/articles/${id}`)
        .set('auth-token', authToken)
        .send(field);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('msg');
      expect(res.body).toHaveProperty('updatedArticle');
      expect(res.body.updatedArticle).toMatchObject(field);
      done();
    });
  });
  describe('Delete Article', () => {
    it('Should return 404 if the article with that id is not found', async (done) => {
      const id = mongoose.Types.ObjectId().toHexString();
      const res = await request(app).delete(`/articles/${id}`).set('auth-token', authToken);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/no article/i);
      done();
    });
    it('Should delete the article if it is present in database', async (done) => {
      const savedArticle = await exec();
      const id = savedArticle.body.savedArticle._id;
      const res = await request(app).delete(`/articles/${id}`).set('auth-token', authToken);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/deleted/i);
      done();
    });
    it('Should removes the article with provided id', async (done) => {
      const savedArticle = await exec();
      const id = savedArticle.body.savedArticle._id;
      await request(app).delete(`/articles/${id}`).set('auth-token', authToken);
      const res = await Article.findById(id);
      expect(res).toBeNull();
      done();
    });
  });
});

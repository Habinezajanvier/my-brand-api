import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import createToken from '../../src/helpers/generateToken';

describe('Authorization', () => {
  describe('Normal Authorization', () => {
    it('Should return 401 if no token provided', async (done) => {
      const res = await request(app).get('/messages');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch('Access Denied');
      done();
    });
    it('Should return 401 if token was invalid', async (done) => {
      const authToken = new Array(12).join('a');
      const res = await request(app).get('/messages').set('auth-token', authToken);
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/invalid/i);
      done();
    });
  });
  describe('Admin Authorization', () => {
    it('Should return 403 if user is not admin', async (done) => {
      const user = {
        _id: mongoose.Types.ObjectId,
        fullNames: 'fullnames',
        email: 'email@example.com',
        isAdmin: false
      };
      const authToken = createToken(user);
      const res = await request(app).get('/messages').set('auth-token', authToken);
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch('Access Denied');
      done();
    });
  });
});

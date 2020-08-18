import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app';
import { url } from '../../../src/models/connection';
import Message from '../../../src/models/messages';
import createToken from '../../../src/helpers/generateToken';

describe('/messages', () => {
  let authToken;
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  afterEach(async () => {
    await Message.deleteMany();
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
  describe('Create a Message', () => {
    it('Should return 200 if message saved successfuly', async (done) => {
      const newMessage = {
        names: 'fullnames',
        email: 'email@example.com',
        message: 'Hey, this is the message for testing'
      };
      const res = await request(app).post('/messages').send(newMessage);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('msg');
      expect(res.body).toHaveProperty('savedMessage');
      expect(res.body.savedMessage).toMatchObject(newMessage);
      done();
    });
  });
  describe('Read messages', () => {
    it('Should return 404 if no message found in DB', async (done) => {
      const res = await request(app).get('/messages').set('auth-token', authToken);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/no message/i);
      done();
    });
    it('Should return all messages found in DB', async (done) => {
      const newMessage = {
        names: 'fullnames',
        email: 'email@example.com',
        message: 'Hey, this is the message for testing'
      };
      await new Message(newMessage).save();
      const res = await request(app).get('/messages').set('auth-token', authToken);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      done();
    });
  });
  describe('Delete message', () => {
    const newMessage = {
      names: 'user names',
      email: 'email@example.com',
      message: 'hey, This is the message for testing'
    };
    const exec = () => request(app).post('/messages').send(newMessage);
    it('Should return 404, if no message with provided id', async (done) => {
      const id = mongoose.Types.ObjectId().toHexString();
      const res = await request(app).delete(`/messages/${id}`).set('auth-token', authToken);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/no message/i);
      done();
    });
    it('Should delete the message if id provided is valid', async (done) => {
      const saves = await exec();
      const id = saves.body.savedMessage._id;
      await request(app).delete(`/messages/${id}`).set('auth-token', authToken);
      const res = await Message.findById(id);
      expect(res).toBeNull();
      done();
    });
    it('Should return deleted object if _id was valid', async (done) => {
      const saves = await exec();
      const id = saves.body.savedMessage._id;
      const res = await request(app).delete(`/messages/${id}`).set('auth-token', authToken);
      expect(res.status).toBe(200);
      expect(res.body.result).toMatchObject(newMessage);
      done();
    });
  });
});

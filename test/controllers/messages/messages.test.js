import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app';
import { url } from '../../../src/models/connection';
import Message from '../../../src/models/messages';

describe('/Create a Message', () => {
  beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  afterEach(async () => {
    await Message.deleteMany();
  });
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

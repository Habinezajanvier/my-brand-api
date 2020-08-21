/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../../config/config';
import User from './user';
import hashPassword from '../helpers/hashPwd';

const {
  db: { host, port, name }
} = config;

export const url = `mongodb://${host}:${port}/${name}?authSource=admin`
  || config.db.database_url;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const createAdmin = async () => {
  try {
    const password = await hashPassword(process.env.ADMIN_PASSWORD);
    const user = new User({
      fullNames: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password,
      isAdmin: true
    });
    await user.save();
    console.log('Db connected and admin created');
  } catch (error) {
    console.log('Something went wrong');
  }
};

export default () => {
  mongoose
    .connect(url, options)
    .then(() => {
      createAdmin();
    })
    .catch((error) => {
      throw new Error(error);
    });
};

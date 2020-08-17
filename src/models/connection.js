import mongoose from 'mongoose';
import config from '../../config/config';

const {
  db: { host, port, name },
} = config;

export const url =
  `mongodb://${host}:${port}/${name}?authSource=admin` ||
  config.db.database_url;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

export default () => {
  mongoose
    .connect(url, options)
    .then(() => console.log('connected to mongodb'))
    .catch((error) => {
      throw new Error(error);
    });
};

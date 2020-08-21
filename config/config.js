require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const development = {
  db: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    name: process.env.DB_NAME_DEV
  }
};
const test = {
  db: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    name: process.env.DB_NAME_TEST
  }
};
const staging = {
  db: {
    database_url: process.env.DATABASE_URL
  }
};
const production = {
  db: {
    database_url: process.env.DATABASE_URL
  }
};

const config = {
  development,
  test,
  staging,
  production
};

module.exports = config[env];

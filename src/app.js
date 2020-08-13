import express from 'express';
import morgan from 'morgan';
import dbConnections from './models/connection';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

dbConnections();
/**
 * Routes configurations
 */

app.use('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome on my website' });
});

export default app;

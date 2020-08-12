import express from 'express';
import morgan from 'morgan';
import dbConnections from './models/connection';
import articleRouter from './routes/articles';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

dbConnections();
/**
 * Routes handlers
 */
app.use('/', articleRouter);
app.use('/', (req, res, next) => {
  res.status(404).send({ msg: 'No page found' });
});

export default app;

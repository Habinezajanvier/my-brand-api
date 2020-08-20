import express from 'express';
import morgan from 'morgan';
import dbConnections from './models/connection';
import userRoute from './routes/auth';
import messageRoute from './routes/message';
import articleRoute from './routes/article';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

dbConnections();
/**
 * Routes configurations
 */
app.use('/user', userRoute);
app.use('/messages', messageRoute);
app.use('/articles', articleRoute);
app.use('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome on my website' });
});

export default app;

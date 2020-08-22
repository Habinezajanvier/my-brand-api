import express from 'express';
import morgan from 'morgan';
import dbConnections from './models/connection';
import userRoute from './routes/auth';
import messageRoute from './routes/message';
import articleRoute from './routes/article';
import profileRouter from './routes/profile';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

dbConnections();
/**
 * Routes configurations
 */
app.use('/user', userRoute);
app.use('/messages', messageRoute);
app.use('/articles', articleRoute);
app.use('/user/profile', profileRouter);
app.use('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome on my website' });
});

export default app;

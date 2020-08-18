import { Router } from 'express';
import MessageController from '../controllers/messages';
import messageValidation from '../middlewares/messageValidation';

const messageRoute = new Router();

messageRoute.post('/', messageValidation, MessageController.postMessage);

export default messageRoute;

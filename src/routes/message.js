import { Router } from 'express';
import MessageController from '../controllers/messages';
import asyncHandler from '../middlewares/asyncHandlers';
import messageValidation from '../middlewares/messageValidation';
import { auth, adminAuth } from '../middlewares/authorization';

const messageRoute = new Router();

messageRoute
  .post('/', messageValidation, asyncHandler(MessageController.postMessage))
  .get('/', [auth, adminAuth], asyncHandler(MessageController.readMessage));

export default messageRoute;

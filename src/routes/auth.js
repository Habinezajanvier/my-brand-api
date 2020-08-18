import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandlers';
import SignupController from '../controllers/authentication';
import {
  signupValidation,
  loginValidation
} from '../middlewares/userValidation';

const userRoute = new Router();

userRoute
  .post('/signup', signupValidation, asyncHandler(SignupController.signup))
  .post('/login', loginValidation, asyncHandler(SignupController.login));

export default userRoute;

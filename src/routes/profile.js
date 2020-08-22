import { Router } from 'express';
import upload from '../middlewares/multer';
import { auth } from '../middlewares/authorization';
import Profile from '../controllers/profile';
import asyncHandler from '../middlewares/asyncHandlers';

const profileRouter = new Router();

profileRouter
  .post(
    '/image',
    [auth],
    upload.single('profilePicture'),
    asyncHandler(Profile.profileImage)
  );

export default profileRouter;

import { Router } from 'express';
import UserController from '../controllers/authentication';
import asyncHandler from '../middlewares/asyncHandlers';
import googlePasspport from '../middlewares/passport';

const googleRoute = new Router();

googleRoute
  .use(googlePasspport.initialize())
  .get('/google',
    googlePasspport.authenticate('google', { scope: ['profile', 'email'] }))
  .get(
    '/google/callback',
    googlePasspport.authenticate('google', { failureRedirect: '/login' }),
    asyncHandler(UserController.googleAuth)
  );

export default googleRoute;

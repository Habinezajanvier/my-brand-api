import { Router } from 'express';
import ArticleController from '../controllers/articles';
import asyncHandler from '../middlewares/asyncHandlers';
import { auth, adminAuth } from '../middlewares/authorization';
import { createValidation, updateValidation } from '../middlewares/articleValidation';

const articleRoute = new Router();

articleRoute
  .post('/', [auth, adminAuth], createValidation, asyncHandler(ArticleController.createArticle))
  .get('/', [auth, adminAuth], asyncHandler(ArticleController.readArticle))
  .get('/:_id', [auth, adminAuth], asyncHandler(ArticleController.singleArtcle))
  .put('/:_id', [auth, adminAuth], updateValidation, asyncHandler(ArticleController.updateArticle))
  .delete('/:_id', [auth, adminAuth], asyncHandler(ArticleController.deleteArticle));

export default articleRoute;

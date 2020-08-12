import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandlers';
import articleValidation from '../middlewares/articleValidation';
import ArticleController from '../controllers/article';

const articleRouter = new Router();

articleRouter
  .post(
    '/articles',
    articleValidation,
    asyncHandler(ArticleController.postArticle)
  )
  .get('/articles', asyncHandler(ArticleController.getArticle));

export default articleRouter;

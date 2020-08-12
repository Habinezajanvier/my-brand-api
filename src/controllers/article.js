import Article from '../models/article';

export default {
  postArticle: async (req, res) => {
    const { title, body } = req.body;
    const article = new Article({
      title,
      body,
    });
    const result = await article.save();
    return res
      .status(201)
      .send({ msg: 'article created successfully', result });
  },
  getArticle: async (req, res) => {
    const articles = await Article.find();
    return res.status(200).send(articles);
  },
};

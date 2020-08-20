import Article from '../../models/articles';

export default async (req, res) => {
  const articles = await Article.find();
  if (articles.length === 0) {
    return res
      .status(404)
      .send({ msg: 'No Article created yet' });
  }
  return res
    .status(200)
    .send(articles);
};

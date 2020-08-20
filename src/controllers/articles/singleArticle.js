import Article from '../../models/articles';

export default async (req, res) => {
  const { _id } = req.params;
  const singleArticle = await Article.findById({ _id });
  if (!singleArticle) {
    return res
      .status(404)
      .send({ msg: 'No Article found' });
  }
  return res
    .status(200)
    .send(singleArticle);
};

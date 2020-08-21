import Article from '../../models/articles';

export default async (req, res) => {
  const { _id } = req.params;
  const theArticle = await Article.findByIdAndDelete({ _id });
  if (!theArticle) {
    return res
      .status(404)
      .send({ msg: 'No article with the same id' });
  }
  return res
    .status(200)
    .send({
      msg: 'Article deleted Successfully',
      theArticle
    });
};

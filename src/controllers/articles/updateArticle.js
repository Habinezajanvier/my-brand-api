import Article from '../../models/articles';

export default async (req, res) => {
  const { _id } = req.params;
  const { title, body } = req.body;
  const article = await Article.findById({ _id });

  if (!article) {
    return res
      .status(404)
      .send({ msg: 'No article with such id' });
  }
  article.set({
    title: title || article.title,
    body: body || article.body
  });
  const updatedArticle = await article.save();
  return res
    .status(200)
    .send({
      msg: 'Updated successfully',
      updatedArticle
    });
};

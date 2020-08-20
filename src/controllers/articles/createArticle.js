import Article from '../../models/articles';

export default async (req, res) => {
  const { title, body } = req.body;
  const { _id, fullNames } = req.user;
  const newArticle = new Article({
    title,
    author: { _id, fullNames },
    body
  });

  const savedArticle = await newArticle.save();
  return res
    .status(201)
    .send({
      msg: 'Article created successfully',
      savedArticle
    });
};

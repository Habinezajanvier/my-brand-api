import Joi from '@hapi/joi';

export default (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    body: Joi.string().min(10).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};

import Joi from '@hapi/joi';

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullNames: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  return next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  return next();
};

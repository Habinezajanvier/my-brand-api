import Joi from '@hapi/joi';

export default async (req, res, next) => {
  const schema = Joi.object({
    names: Joi.string()
      .required()
      .trim()
      .regex(/^[a-z]{2}([a-z][\W]*)/i)
      .messages({
        'string.empty': 'Your names are required',
        'string.pattern.base': 'Names should be valid names'
      }),
    email: Joi.string().email().required().trim()
      .lowercase()
      .messages({
        'string.email': 'Email must be a valid email',
        'string.lowercase': 'Email should be in lowercase',
        'string.empty': 'Email is required'
      }),
    message: Joi.string().required().trim().min(24)
      .messages({
        'string.empty': 'Empty message can\'t be saved',
        'string.min': 'Valid message can\'t be below 24 Characters'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  return next();
};

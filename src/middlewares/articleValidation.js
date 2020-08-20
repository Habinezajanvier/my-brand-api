import Joi from '@hapi/joi';

export const createValidation = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().trim()
      .messages({
        'string.base': 'Article title have to be a sring',
        'string.empty': 'Article title should not be empty',
        'string.required': 'Article title is require'
      }),
    body: Joi.string().required().trim().min(25)
      .messages({
        'string.empty': 'Article body can\'t be empty',
        'string.required': 'Article body is required',
        'string.min': 'Article body can\'t below 25 characters'
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  return next();
};

export const updateValidation = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim()
      .messages({
        'string.base': 'Article title have to be a sring',
        'string.empty': 'Article title should not be empty'
      }),
    body: Joi.string().trim().min(25)
      .messages({
        'string.empty': 'Article body can\'t be empty',
        'string.required': 'Article body is required'
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  return next();
};

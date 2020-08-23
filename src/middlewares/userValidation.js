import Joi from '@hapi/joi';

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullNames: Joi.string()
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
    password: Joi.string()
      .required()
      .regex(/^[a-z]{4,}\d+/i)
      .messages({
        'string.empty': 'Password is required',
        'string.pattern.base':
          'Password must be four letter long plus digit numbers'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  return next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim()
      .lowercase()
      .messages({
        'string.email': 'Email must be a valid email',
        'string.lowercase': 'Email should be in lowercase',
        'string.empty': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .regex(/^[a-z]{4,}\d+/i)
      .messages({
        'string.empty': 'Password is required',
        'string.pattern.base':
          'Password must be four letter long plus digit numbers'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  return next();
};

export const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    fullNames: Joi.string()
      .trim()
      .regex(/^[a-z]{2}([a-z][\W]*)/i)
      .messages({
        'string.empty': 'Your names are required',
        'string.pattern.base': 'Names should be valid names'
      }),
    bio: Joi.string().min(24)
      .messages({
        'string.base': 'Bio should be a string',
        'string.min': 'Bio should not be less than 24 characters'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  return next();
};

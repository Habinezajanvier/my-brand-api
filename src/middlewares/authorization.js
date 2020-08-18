import jwt from 'jsonwebtoken';

require('dotenv').config();

export const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ msg: 'Access Denied' });
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const validToken = jwt.verify(token, privateKey);
    req.user = validToken;
    return next();
  } catch (error) {
    return res.status(400).send({ msg: 'Invalid token' });
  }
};

export const adminAuth = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).send({ msg: 'Access Denied' });

  return next();
};

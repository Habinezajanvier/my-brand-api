import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default (data) => {
  const privateKey = process.env.PRIVATE_KEY;
  try {
    const token = jwt.sign(
      {
        _id: data._id,
        fullNames: data.fullNames,
        email: data.email,
        isAdmin: data.isAdmin,
      },
      privateKey,
      { algorithm: 'HS256', expiresIn: '5d' }
    );
    return token;
  } catch (error) {
    throw new Error('unable to generate token');
  }
};

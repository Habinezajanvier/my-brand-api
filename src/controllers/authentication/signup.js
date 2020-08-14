import User from '../../models/user';
import hashPassword from '../../helpers/hashPwd';
import createToken from '../../helpers/generateToken';

export default async (req, res) => {
  const { fullNames, email, password } = req.body;
  const emailToSave = email.toLowerCase().trim();

  const userExist = await User.findOne({ email: emailToSave });
  if (userExist) return res.status(409).send({ msg: 'Email already exist' });

  const hashedPassword = await hashPassword(password);

  const user = new User({
    fullNames,
    email: emailToSave,
    password: hashedPassword
  });
  const createdUser = await user.save();
  const token = createToken(createdUser);

  return res.status(201).send({
    msg: 'User Created successfully',
    user: {
      _id: createdUser._id,
      fullNames: createdUser.fullNames,
      email: createdUser.email
    },
    token
  });
};

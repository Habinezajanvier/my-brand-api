import bcrypt from 'bcryptjs';
import User from '../../models/user';
import createToken from '../../helpers/generateToken';

export default async (req, res) => {
  const { email, password } = req.body;

  const account = await User.findOne({ email });
  if (!account) {
    return res.status(404).send({ msg: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, account.password);
  if (!validPassword) {
    return res.status(400).send({ msg: 'Invalid email or password' });
  }
  const token = createToken(account);

  return res.status(200).send({
    msg: 'Successfully loged in',
    user: {
      _id: account._id,
      fullNames: account.fullNames,
      email: account.email,
    },
    token,
  });
};

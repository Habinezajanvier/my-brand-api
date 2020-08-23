import createToken from '../../helpers/generateToken';

export default async (req, res) => {
  const token = createToken(req.user);
  return res
    .status(200)
    .send({ user: req.user, token });
};

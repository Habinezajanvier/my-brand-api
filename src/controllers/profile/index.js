import User from '../../models/user';

export default {
  profileImage: async (req, res) => {
    if (!req.file) return res.status(400).send({ msg: 'your photo can\'t be saved' });

    const user = await User.findByIdAndUpdate(req.user._id,
      { photoUrl: req.file.path },
      { new: true });

    return res
      .status(200)
      .send({
        msg: 'Profile Picture updated successfully',
        user: {
          fullNames: user.fullNames,
          email: user.email,
          photoUrl: user.photoUrl
        }
      });
  },
  editProfile: async (req, res) => {
    const { fullNames, bio } = req.body;
    const { _id } = req.user;
    const user = await User.findById({ _id });

    if (!user) return res.status(404).send({ msg: 'No user found' });

    user.set({
      fullNames: fullNames || user.fullNames,
      bio
    });
    const updatedUser = await user.save();
    return res
      .status(200)
      .send({
        msg: 'Info successfully updated',
        user: {
          fullNames: updatedUser.fullNames,
          email: updatedUser.email,
          photoUrl: updatedUser.photoUrl || null,
          bio: updatedUser.bio
        }
      });
  }
};

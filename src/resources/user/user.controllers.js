import { User } from './user.model.js';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      res.status(400).end();
    } else {
      res.status(200).send({ data: user });
    }
  } catch (error) {
    res.status(400).end();
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    if (!user) {
      return res.status(400).end();
    }

    if (req.body.password) {
      user.password = req.body.password;
      await user.save();
      res.status(200).send({
        data: {
          _id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
          userName: user.userName
        }
      });
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
};

import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { User } from '../resources/user/user.model.js';

export const newToken = (user) =>
  jwt.sign({ id: user._id, role: user.role, name: user.name }, config.secret, {
    expiresIn: config.expiration
  });

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });

export const signUp = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res
      .status(400)
      .send({ message: 'Please provide and email and a password' });
  } else {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
      });
      const token = newToken(user);
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(500).end();
    }
  }
};

export const signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: 'Please provide and email and a password' });
  }

  const invalid = { message: 'Invalid email or password' };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const passwordMatch = await user.checkPassword(req.body.password);

    if (!passwordMatch) {
      return res.status(401).send(invalid);
    }
    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (error) {
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

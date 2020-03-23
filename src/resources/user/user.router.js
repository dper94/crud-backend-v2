import express from 'express';

export const UserRouter = express.Router();

const controller = (req, res) => {
  res.send({ data: 'hello' });
};

UserRouter.get('/:id', controller).put('/:id', controller);

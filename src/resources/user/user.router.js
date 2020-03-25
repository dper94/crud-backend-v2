import express from 'express';

export const userRouter = express.Router();

const controller = (req, res) => {
  res.send({ data: 'hello' });
};

userRouter
  .route('/:id')
  .get(controller)
  .put(controller);

import express from 'express';

export const orderRouter = express.Router();

const controller = (req, res) => {
  res.send({ data: 'hello' });
};

orderRouter
  .route('/')
  .get(controller)
  .post(controller);

orderRouter
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller);

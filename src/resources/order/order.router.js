import express from 'express';

export const itemRouter = express.Router();

const controller = (req, res) => {
  res.send({ data: 'hello' });
};

itemRouter
  .route('/')
  .get(controller)
  .post(controller);

itemRouter
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller);

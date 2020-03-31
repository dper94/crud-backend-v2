import express from 'express';
import orderControllers from './order.controllers.js';

export const orderRouter = express.Router();

orderRouter
  .route('/')
  .get(orderControllers.getMany)
  .post(orderControllers.createOne);

orderRouter
  .route('/:id')
  .get(orderControllers.getOne)
  .put(orderControllers.updateOne)
  .delete(orderControllers.deleteOne);

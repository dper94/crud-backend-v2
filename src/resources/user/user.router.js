import express from 'express';
import { getUser, updateUser } from './user.controllers.js';

export const userRouter = express.Router();

userRouter
  .route('/me')
  .get(getUser)
  .put(updateUser);

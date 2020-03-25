import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from './config/config.js';
import { userRouter } from './resources/user/user.router.js';
import { orderRouter } from './resources/order/order.router.js';
import { connect } from './utils/db.js';
import { protect, signUp, signIn } from './utils/auth.js';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', signUp);
app.post('/signin', signIn);

app.use('/api', protect);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

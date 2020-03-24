import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from './config/config.js';
import { UserRouter } from './resources/user/user.router.js';
import { connect } from './utils/db.js';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/user', UserRouter);

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

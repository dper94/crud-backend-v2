import mongoose from 'mongoose';
import { config } from '../config/config.js';

export const connect = (
  url = config.dbUrl,
  opts = { useUnifiedTopology: true, useNewUrlParser: true }
) => mongoose.connect(url, { ...opts });

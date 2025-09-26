import express from 'express';
import cors from 'cors';
import { messagesRouter } from './messages';
import mongoose from 'mongoose';
import { getMongoConnectionUri } from './utils/getMongoConnectionUri';

const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';
const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  if (ENVIRONMENT === 'DEV') {
    await import('dotenv').then(({ config }) => config());
  }

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', messagesRouter);

  await mongoose.connect(getMongoConnectionUri());
  console.log('MongoDB is connected');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

bootstrap();

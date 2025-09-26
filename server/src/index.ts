import express from 'express';
import cors from 'cors';
import { messagesRouter } from './messages';
import mongoose from 'mongoose';

const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017';

const bootstrap = async () => {
  if (ENVIRONMENT === 'DEV') {
    await import('dotenv').then(({ config }) => config());
  }
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', messagesRouter);

  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB подключен');
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
};

bootstrap();

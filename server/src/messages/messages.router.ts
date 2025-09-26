import { MessagesController } from './messages.controller';
import { createMessageValidation } from './messages.validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/messages',
  createMessageValidation,
  MessagesController.createMessage
);

export default router;

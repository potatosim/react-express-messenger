import { Request, Response } from 'express';
import { MessagesService } from './messages.service';
import { MongooseError } from 'mongoose';

const service = new MessagesService();

export class MessagesController {
  static async createMessage(req: Request, res: Response) {
    try {
      const newMessage = await service.createMessage(req.body);
      return res.status(201).json({ success: true, data: newMessage });
    } catch (err) {
      return res.status(500).json({ error: (err as MongooseError).message });
    }
  }
}

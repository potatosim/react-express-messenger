import { Document, Schema, model } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  phone: string;
  message: string;
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
});

export const MessageModel = model<IMessage>('messages', MessageSchema);

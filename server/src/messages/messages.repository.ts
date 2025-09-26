import { MessageModel, IMessage } from './messages.model';

export class MessagesRepository {
  async create(data: IMessage) {
    const message = new MessageModel(data);

    return await message.save();
  }
}

import { MessagesRepository } from './messages.repository';
import { IMessage } from './messages.model';

export class MessagesService {
  private readonly messagesRepository: MessagesRepository;

  constructor() {
    this.messagesRepository = new MessagesRepository();
  }

  async createMessage(messageDto: IMessage) {
    const result = await this.messagesRepository.create(messageDto);

    return result;
  }
}

import Message from '../models/messageModel'

export class MessageService {
  static async saveMessage(text: string, name: string, socketID: string) {
    const message = new Message({ text, name, socketID })
    await message.save()
    return message
  }

  static async getMessages() {
    return await Message.find().sort({ createdAt: -1 })
  }
}

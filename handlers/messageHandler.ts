import { Request, Response } from 'express'
import { MessageService } from '../services/messageService'

export class Messages {
  static async getMessages(req: Request, res: Response) {
    try {
      const messages = await MessageService.getMessages()
      res.status(200).json({ messages })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}

import { Request, Response } from 'express'
import { PollService } from '../services/pollService'

export class Polls {
  static async createPoll(req: Request, res: Response) {
    try {
      const { userId, question, options } = req.body
      const poll = await PollService.createPoll(userId, question, options)
      res.status(201).json({ poll })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async vote(req: Request, res: Response) {
    try {
      const { pollId, optionIndex } = req.body
      const poll = await PollService.vote(pollId, optionIndex)
      res.status(200).json({ poll })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async getPolls(req: Request, res: Response) {
    try {
      const polls = await PollService.getPolls()
      res.status(200).json({ polls })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }
}

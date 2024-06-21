import Poll from '../models/pollModel'
import { IPoll } from '../types'
import clientPromise from '../lib/mongo'

export class PollService {
  static async createPoll(
    userId: string,
    question: string,
    options: string[]
  ): Promise<IPoll> {
    try {
      await clientPromise
      const poll = new Poll({
        question,
        options: options.map((text) => ({ text, votes: 0 })),
        createdBy: userId,
      })
      const savedPoll = await poll.save()
      return savedPoll
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async vote(
    pollId: string,
    optionIndex: number
  ): Promise<IPoll | null> {
    try {
      await clientPromise
      const poll = await Poll.findById(pollId)
      if (!poll) throw new Error('Poll not found')
      poll.options[optionIndex].votes += 1
      const updatedPoll = await poll.save()
      return updatedPoll
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async getPolls(): Promise<IPoll[]> {
    try {
      await clientPromise
      const polls = await Poll.find().populate('createdBy', 'username')
      return polls
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }
}

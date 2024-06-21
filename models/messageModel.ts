import { Schema, model } from 'mongoose'
import { IMessage } from '../types'

const messageSchema = new Schema<IMessage>(
  {
    text: { type: String, required: true },
    name: { type: String, required: true },
    socketID: { type: String, required: true },
  },
  { timestamps: true }
)

const Message = model<IMessage>('Message', messageSchema)

export default Message

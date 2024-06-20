import { Schema, model } from 'mongoose'
import { IPoll } from '../types'

const pollSchema = new Schema<IPoll>(
  {
    question: { type: String, required: true },
    options: [{ text: String, votes: { type: Number, default: 0 } }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const Poll = model<IPoll>('Poll', pollSchema)

export default Poll

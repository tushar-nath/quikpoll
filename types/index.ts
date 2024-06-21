import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  username: string
  email: string
  password: string
}

export interface IPoll extends Document {
  question: string
  options: { text: string; votes: number }[]
  createdBy: IUser['_id']
}

export interface IMessage extends Document {
  text: string
  name: string
  socketID: string
}

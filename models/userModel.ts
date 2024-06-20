import { Schema, model } from 'mongoose'
import { IUser } from '../types'

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = model<IUser>('User', userSchema)

export default User

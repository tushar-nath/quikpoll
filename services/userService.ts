import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from '../types'
import clientPromise from '../lib/mongo'

export class UserService {
  static async signup(
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<IUser> {
    try {
      await clientPromise
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      })
      if (existingUser) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
      })
      const savedUser = await user.save()
      return savedUser
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async login(email: string, password: string) {
    await clientPromise
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error('Invalid credentials')
    const token = this.generateToken(user)
    return { user, token }
  }

  static generateToken(user: any) {
    return jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' })
  }

  static async updateUser(
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      await clientPromise
      const user = await User.findByIdAndUpdate(userId, updates, { new: true })
      return user
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await clientPromise
      await User.findByIdAndDelete(userId)
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async listUsers(): Promise<IUser[]> {
    try {
      await clientPromise
      const users = await User.find()
      return users
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }

  static async searchUser(name: string): Promise<IUser[]> {
    try {
      await clientPromise
      const users = await User.find({ name: new RegExp(name, 'i') })
      return users
    } catch (error: any) {
      console.error('Error:', error)
      throw error
    }
  }
}

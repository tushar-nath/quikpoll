import { Request, Response } from 'express'
import { UserService } from '../services/userService'

export class Users {
  static async signup(req: Request, res: Response) {
    try {
      const { name, username, email, password } = req.body
      const user = await UserService.signup(name, username, email, password)
      const token = UserService.generateToken(user)
      const { password: _, ...userPayload } = user.toObject()
      res.status(201).json({ user: userPayload, token })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const { user, token } = await UserService.login(email, password)
      const { password: _, ...userPayload } = user.toObject()
      res.status(200).json({ user: userPayload, token })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const updates = req.body
      const user = await UserService.updateUser(userId, updates)
      res.status(200).json({ user })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      await UserService.deleteUser(userId)
      res.status(200).json({ message: 'User deleted successfully' })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async listUsers(req: Request, res: Response) {
    try {
      const users = await UserService.listUsers()
      res.status(200).json({ users })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }

  static async searchUser(req: Request, res: Response) {
    try {
      const { name } = req.query
      const users = await UserService.searchUser(name as string)
      res.status(200).json({ users })
    } catch (error: any) {
      console.error('Error:', error)
      res.status(400).json({ error: error.message })
    }
  }
}

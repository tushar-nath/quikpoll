import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import AppConfig from '../config'
import healthRoute from '../routes/healthRoute'
import userRoutes from '../routes/userRoutes'
import pollRoutes from '../routes/pollRoutes'
import { createServer } from 'http'
import messageRoutes from '../routes/messageRoutes'
import { MessageService } from '../services/messageService'

dotenv.config()

const app = express()

// Set up sessions to store user data
app.use(
  session({
    secret: 'quikpoll-session',
    resave: true,
    saveUninitialized: true,
  })
)

const corsOptions = {
  // TODO: Only allow all origins when running locally but restrict in production
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: AppConfig.BODY_PARSER_LIMIT }))

app.use('/api/healthcheck', healthRoute)
app.use('/api/users', userRoutes)
app.use('/api/polls', pollRoutes)
app.use('/api/messages', messageRoutes)

const PORT = process.env.PORT || 4000
const httpServer = createServer(app)

const socketIO = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

let users: any = []

socketIO.on('connection', (socket: any) => {
  console.log(`⚡: ${socket.id} user just connected!`)

  socket.on('message', async (data: any) => {
    const message = await MessageService.saveMessage(
      data.text,
      data.name,
      data.socketID
    )
    socket.broadcast.emit('messageResponse', message)
  })

  socket.on('typing', (data: any) => {
    socket.broadcast.emit('typingResponse', data)
  })

  socket.on('newUser', (data: { username: string }) => {
    users = users.filter((user: any) => user.socketID !== socket.id)

    users.push({
      username: data.username,
      socketID: socket.id,
    })

    socketIO.emit('newUserResponse', users)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
    users = users.filter((user: any) => user.socketID !== socket.id)
    socketIO.emit('newUserResponse', users)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})

process.on('SIGTERM', close)
process.on('SIGINT', close)

function close() {
  console.log('Shutting down gracefully')
  process.exit(0)
}

export default app

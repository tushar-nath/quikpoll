import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import AppConfig from '../config'
import healthRoute from '../routes/healthRoute'
import userRoutes from '../routes/userRoutes'

dotenv.config()

const app = express()

// Set up sessions to store user data
app.use(
  session({
    secret: 'buzzboard-session',
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

export default app

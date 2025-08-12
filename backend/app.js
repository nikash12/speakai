import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import deepgramRoute from './routes/deepgram.router.js'
import interviewRoute from './routes/interview.router.js'
import bodyParser from 'body-parser'
const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin:"*",
}))

app.use('/api/',userRouter)
app.use('/api/speech/',deepgramRoute)
app.use('/api/interview/',interviewRoute)

export default app
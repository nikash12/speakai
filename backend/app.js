import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import deepgramRoute from './routes/deepgram.router.js'
const app = express()

app.use(express.json())

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use('/api/',userRouter)
app.use('/api/speech/',deepgramRoute)

export default app
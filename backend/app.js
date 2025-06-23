import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
const app = express()

app.use(express.json())

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use('/api/',userRouter)

export default app
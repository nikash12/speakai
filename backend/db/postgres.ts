import {Client} from 'pg'
import  dotenv from 'dotenv'
dotenv.config()
const client = new Client({
    connectionString:process.env.DATABASE_URL
})

client.connect()
.then(()=>console.log("Connected to postgres on NeonDB"))
.catch((err)=>console.log(err))
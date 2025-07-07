import app from './app'
import ConnectDB from './db/index'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT 
const connect = ()=>{
    ConnectDB().then(()=>{
        app.listen(port,()=>console.log("running on port" + port))
    }).catch(err=>console.log(err))
}
connect()

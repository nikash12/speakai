import app from './app.js'
import ConnectDB from './db/index.js'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 2001
const connect = ()=>{
    ConnectDB().then(()=>{
        app.listen(port,'0.0.0.0',console.log("running on port" + port))
    }).catch(err=>console.log(err))
}
connect()

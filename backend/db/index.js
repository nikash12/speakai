import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export default async function ConnectDB() {
    try{
        const res = await mongoose.connect(process.env.DB_URL)
        if(!res){
            return;
        }
        console.log("db connected");
    }catch(err){
        console.log(err);
    }
}
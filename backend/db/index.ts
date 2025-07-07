import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export default async function ConnectDB() {
    try{
        const url = process.env.DB_URL 
        if(!url)throw new Error("URL to connect mongoDB not found")
        const res = await mongoose.connect(url)
        if(!res){
            return;
        }
        console.log("db connected");
    }catch(err){
        console.log(err);
    }
}
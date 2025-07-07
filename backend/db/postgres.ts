import {Client} from 'pg'
import  dotenv from 'dotenv'
dotenv.config()
const url = process.env.DATABASE_URL 
if(!url)throw new Error("URL to connect postgres not found")
const client = new Client({
    connectionString:url
})

client.connect()
.then(()=>console.log("Connected to postgres on NeonDB"))
.catch((err)=>console.log(err))
const res = await client.query(`
    alter table users
    set column password 
    insert into users(username,password,email) values('chiru','12','c@gmail.com'),('pandu','12','c@gmail.com');
`)
  await  client.end()
console.log(res);
//docker run -it --rm postgres psql "postgresql://neondb_owner:npg_vKhtobN24fHT@ep-falling-paper-a1xmay8r-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"^&"channel_binding=require"
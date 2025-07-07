import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL
});
client.connect()
    .then(() => console.log("Connected to postgres on NeonDB"))
    .catch((err) => console.log(err));
const res = await client.query(`
        CREATE TABLE USER(
            id SERIAL PRIMARY KEY,
            username VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) UNIQUE NOT NULL,
            email VARCHAR(320) UNIQUE
        );

    `);
console.log(res);

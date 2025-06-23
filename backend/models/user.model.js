import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required: [true, "Must provide password"]
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    age:{
        type: Number,
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User
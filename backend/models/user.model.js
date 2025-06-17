import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true,
    },
    password: {
        type: String,
        required: [true, "Must provide password"]
    },
    email:{
        type: String,
        required:true
    },
    age:{
        type: Number,
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User
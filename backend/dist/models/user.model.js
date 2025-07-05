"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Must provide password"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SpeechSchema = mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    transcript: {
        type: String,
    },
    duration: {
        type: Number,
    }
}, { timestamps: true });
const Speech = mongoose_1.default.model("Speech", SpeechSchema);
exports.default = Speech;

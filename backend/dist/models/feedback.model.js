"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const feedbackSchema = mongoose_1.default.Schema({
    speechId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Speech",
        required: true
    },
    disfluencies: {
        type: {
            fillerwords: {
                type: String
            },
            stutters: {
                type: String
            },
            pauses: {
                type: String
            }
        },
        required: true
    },
    tone: {
        type: String,
    },
    pace: {
        type: Number,
    },
    score: {
        type: Number,
    },
    feedbackSummary: {
        type: String,
    }
}, { timestamps: true });
const Feedback = mongoose_1.default.model("feedback", feedbackSchema);
exports.default = Feedback;

import mongoose from 'mongoose';
const feedbackSchema = mongoose.Schema({
    speechId: {
        type: mongoose.Schema.Types.ObjectId,
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
const Feedback = mongoose.model("feedback", feedbackSchema);
export default Feedback;

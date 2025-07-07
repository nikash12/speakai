import mongoose from 'mongoose';
const SpeechSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
const Speech = mongoose.model("Speech", SpeechSchema);
export default Speech;

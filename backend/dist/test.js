"use strict";
// server.js (or index.js)
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 5000;
// Middleware
app.use(cors()); // allow frontend to connect
app.use(express.json());
// Multer config to handle blob uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
// POST /api/analyze-speech
app.post("/api/analyze-speech", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file received" });
    }
    console.log("Received file:", req.file.originalname);
    // 👉 Here you can send it to Colab or process with Whisper API
    // For now, respond with fake/mock data
    const fakeTranscript = "Hello, this is a sample voice input.";
    const fakeStats = {
        wordsPerMinute: 123,
        fillerWordCount: 3,
        totalDuration: "5.3s",
        confidence: 0.92,
    };
    res.json({
        transcript: fakeTranscript,
        stats: fakeStats,
    });
});
// Start server
app.listen(port, () => {
    console.log(`🟢 Server running on http://localhost:${port}`);
});

import { createClient } from '@deepgram/sdk';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const speechToText = async (req, res) => {
    try {
        const file = req.file;
        if (!file)
            return res.status(400).json({ msg: "No file uploaded" });
        const path = fs.readFileSync(file.path);
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(path, {
            model: "nova-3",
            smart_format: true,
            mimetype: file.mimetype,
        });
        console.log(result);
        if (error)
            return res.status(400).send({ msg: "Response not given" });
        if (!error)
            res.json(result);
    }
    catch (err) {
        console.error("Transcription error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
export { speechToText };

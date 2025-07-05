"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.speechToText = void 0;
const sdk_1 = require("@deepgram/sdk");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const speechToText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file)
            return res.status(400).json({ msg: "No file uploaded" });
        const path = fs_1.default.readFileSync(file.path);
        const deepgram = (0, sdk_1.createClient)(process.env.DEEPGRAM_API_KEY);
        const { result, error } = yield deepgram.listen.prerecorded.transcribeFile(path, {
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
});
exports.speechToText = speechToText;

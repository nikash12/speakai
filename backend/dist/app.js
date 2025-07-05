"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_js_1 = __importDefault(require("./routes/user.router.js"));
const deepgram_router_js_1 = __importDefault(require("./routes/deepgram.router.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.use('/api/', user_router_js_1.default);
app.use('/api/speech/', deepgram_router_js_1.default);
exports.default = app;

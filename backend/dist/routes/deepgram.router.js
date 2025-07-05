"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_js_1 = require("../controllers/api.controller.js");
const multer_js_1 = __importDefault(require("../utils/multer.js"));
const deepgramRoute = (0, express_1.Router)();
deepgramRoute.route('/analyze-speech').post(multer_js_1.default.single("file"), api_controller_js_1.speechToText);
exports.default = deepgramRoute;

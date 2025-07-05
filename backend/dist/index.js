"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const index_js_1 = __importDefault(require("./db/index.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 2001;
const connect = () => {
    (0, index_js_1.default)().then(() => {
        app_js_1.default.listen(port, '0.0.0.0', console.log("running on port" + port));
    }).catch(err => console.log(err));
};
connect();

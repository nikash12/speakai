"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const blobPath = path_1.default.resolve("backend/blob");
if (!fs_1.default.existsSync(blobPath)) {
    fs_1.default.mkdirSync(blobPath, { recursive: true });
}
const FileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, blobPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: FileStorageEngine });
exports.default = upload;

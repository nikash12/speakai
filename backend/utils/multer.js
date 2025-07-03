import multer from "multer";
import path from "path";
import fs from "fs";

const blobPath = path.resolve("backend/blob");

if (!fs.existsSync(blobPath)) {
  fs.mkdirSync(blobPath, { recursive: true });
}

const FileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, blobPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: FileStorageEngine });
export default upload;

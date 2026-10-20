import multer from "multer";
import path from "node:path";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1_000_000_000)}${path.extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

const fileFilter = (req, file, callback) => {
  if (allowedImageTypes.has(file.mimetype)) {
    return callback(null, true);
  }

  callback(null, false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;

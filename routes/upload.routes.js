import { Router } from "express";
import upload from "../config/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// Convert Multer validation/size errors into a clear client error response.
const handleAvatarUpload = (req, res, next) => {
  upload.single("avatar")(req, res, error => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  });
};

router.post("/upload", verifyToken, handleAvatarUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "An image file is required in the avatar field" });
  }

  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;

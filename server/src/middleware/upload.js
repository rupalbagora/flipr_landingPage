// server/src/middleware/upload.js
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

export const upload = multer({ storage, fileFilter });

export const processImage = (folderName) => async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uploadsDir = path.join(process.cwd(), "uploads", folderName);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
    const filepath = path.join(uploadsDir, filename);

    // 🔥 CROP + RESIZE to 450 x 350
    await sharp(req.file.buffer)
      .resize(450, 350, {
        fit: "cover", // keeps aspect ratio and crops excess
        position: "centre",
      })
      .jpeg({ quality: 80 })
      .toFile(filepath);

    // This path is what frontend will use in <img src="...">
    req.body.imageUrl = `/uploads/${folderName}/${filename}`;

    next();
  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({ message: "Image processing failed" });
  }
};

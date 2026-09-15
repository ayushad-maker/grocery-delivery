import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import { Response, Request } from "express";
import cloudinary from "../config/cloudinary.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/", auth, upload.single("single"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dateURI = "data:" + req.file.mimetype + ";base64" + b64;

    const result = await cloudinary.uploader.upload(dateURI, {
      folder: "grocery-del",
      resource_type: "auto",
    });

    res.json({ url: result.secure_url });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

export default uploadRouter;
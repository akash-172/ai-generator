import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
import Audio from "../mongodb/models/audio.js";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get((req, res) => {
  res.send("This is TTS !");
});

router.route("/").post(async (req, res) => {
  try {
    const { voice, prompt } = req.body;
    if (prompt.length > 500) {
      return res
        .status(422)
        .json({ error: "Prompt must be less than or equal to 500 characters" });
    }
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: prompt,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const handleResult = async (error, result) => {
      if (error) {
        res.status(500).json({ success: false, message: error });
      } else {
        const audio = await Audio.create({
          voice,
          prompt,
          audio: result.secure_url,
        });

        res.status(201).json({ success: true, audioUrl: audio.audio });
      }
    };

    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, handleResult)
      .end(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err });
  }
});

export default router;

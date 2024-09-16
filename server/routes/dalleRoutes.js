import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("This is DALL-E !");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // const response = await openai.createImage({
    //     model: "dall-e-3",
    //     prompt,
    //     n: 1,
    //     size: "1024x1024",
    //     response_format: "b64_json",
    //   });
    // image_url = response.data.data[0].url;

    const aiResponse = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    console.log(aiResponse);
    const image = aiResponse.data[0].b64_json;
    console.log(image);

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error });
  }
});

export default router;

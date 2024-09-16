import mongoose from "mongoose";

const Audio = new mongoose.Schema({
  voice: { type: String, required: true },
  prompt: { type: String, required: true },
  audio: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

const AudioSchema = mongoose.model("Audio", Audio);

export default AudioSchema;

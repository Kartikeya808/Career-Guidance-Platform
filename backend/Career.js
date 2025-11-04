import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  resources: [{ title: String, url: String }]
});

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  roadmap: [stepSchema]
}, { timestamps: true });

export default mongoose.model("Career", careerSchema);

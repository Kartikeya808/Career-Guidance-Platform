import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);

// Test API route (for Render or Postman testing)
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend connected successfully!" });
});

// Root route
app.get("/", (req, res) => {
  res.send({ status: "ok", message: "Career Guidance Backend" });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

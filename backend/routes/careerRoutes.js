import express from "express";
import { getAllCareers, addCareer } from "../controllers/careerController.js";
const router = express.Router();

router.get("/", getAllCareers);
router.post("/", addCareer);

export default router;

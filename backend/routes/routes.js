// FlexLiving Routes
import express from "express";
import { getHostAwayReviews } from "../controllers/reviewsController.js";

const router = express.Router();

// Get all routes
router.get("/reviews/hostaway", getHostAwayReviews);

export default router;

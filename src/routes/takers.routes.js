import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { createTaker, extractActionData, getTakers } from "../controllers/takers.controller.js";

const router = express.Router();

router.get('/get', authenticateToken, getTakers)

router.put('/create', authenticateToken, createTaker)

router.post('/extractActionData', authenticateToken, extractActionData)

export default router;

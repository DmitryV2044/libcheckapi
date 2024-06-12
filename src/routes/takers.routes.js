import express from "express";
import { Cryptographer } from "../services/cryptography.service.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { createTaker, getTakers, takeBook } from "../controllers/takers.controller.js";

const router = express.Router();

router.get('/get', authenticateToken, getTakers)

router.put('/create', authenticateToken, createTaker)

router.put('/takeBook', authenticateToken, takeBook)

// router.get('/get', getTakers)



export default router;

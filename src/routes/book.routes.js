import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { returnBook, takeBook } from "../controllers/book.controller.js";

const router = express.Router();

// router.post('/add')

// router.post('/remove')

router.put('/take', authenticateToken, takeBook)

router.put('/return', authenticateToken, returnBook)

export default router;

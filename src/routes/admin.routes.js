import express from "express";
import { Cryptographer } from "../services/cryptography.service.js";
import { loginAdmin, registrateAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post('/reg', registrateAdmin)

router.post('/login', loginAdmin)

// router.post('/editLogin', loginAdmin)


export default router;

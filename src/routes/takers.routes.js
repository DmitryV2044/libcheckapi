import express from "express";
import { Cryptographer } from "../services/cryptography.service.js";

const router = express.Router();

router.get('/encode', (req, res, next) => {
  const encoded = Cryptographer.instance?.EncodeString(req.query.string)
  res.send({result: encoded})
})

export default router;

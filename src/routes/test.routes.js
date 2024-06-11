import express from "express";
import { Cryptographer } from "../services/cryptography.service.js";
import { generateAccessToken } from "../services/jwt.service.js";
import { loginAdmin, registrateAdmin } from "../controllers/admin.controller.js";
import { getAll } from "../models/libadmins.model.js";

const router = express.Router();

router.get('/encode', (req, res, next) => {
  const encoded = Cryptographer.instance?.EncodeString(req.query.string)
  res.send({result: encoded})
})

router.get('/decode', (req, res, next) => {
  const encoded = Cryptographer.instance?.DecodeString(req.query.string)
  res.send({result: encoded})
})

router.get('/libtoken', async (req, res, next) => {
  const token = generateAccessToken(req.query.id)
  res.send({result: token})
})

router.get('/getadmins', async (req, res, next) => {
  const result = await getAll()
  res.send({result: result})
})

router.post('/regAdmin', registrateAdmin)

router.post('/logAdmin', loginAdmin)


export default router;

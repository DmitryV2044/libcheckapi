import express from "express";
import { Cryptographer } from "../services/cryptography.service.js";
import { generateAccessToken } from "../services/jwt.service.js";
import { loginAdmin, registrateAdmin } from "../controllers/admin.controller.js";
import { getAll } from "../models/libadmins.model.js";
import { TakersDb } from "../models/takers.model.js";
import { dechipherLibtakers } from "../helpers/dechipher.helper.js";
import { extractActionData } from "../helpers/actions.helper.js";

const router = express.Router();

router.get('/encode', (req, res, next) => {
  const encoded = Cryptographer.instance?.EncodeString(req.query.string)
  res.send({result: encoded})
})

router.get('/extractTakerData', async (req, res, next) => {
  const db = new TakersDb('libtakers4')
  const taker = await db.GetById(1)
  const dTaker = (await dechipherLibtakers([taker]))[0]

  const result = await extractActionData(dTaker.actions);

  res.send({taker: result})
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

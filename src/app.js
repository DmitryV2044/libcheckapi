import express from 'express'
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken'
// import {Securitykey, initVector, algorithm } from './cryptoConfig.js'
import router from './routes/index.js'
// import crypto from 'crypto'
import cors from 'cors'
import { Cryptographer } from './services/cryptography.service.js';
import { limiter } from './middleware/ratelimit.middleware.js'

configDotenv();
const PORT = process.env.PORT;
const algorithm = process.env.algorithm
const SecurityKey = Buffer.alloc(32, process.env.SecurityKey);
const initVector = Buffer.alloc(16, process.env.initVector);

export const JWT_Secret = process.env.JWT_Secret;

export const crypto = new Cryptographer(algorithm, initVector, SecurityKey)
const app = express()
app.use(limiter);
app.use(cors({origin:true,credentials: true}));
app.options('*', cors()) 

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(express.json());
app.use(router);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`App running on port ${PORT}.`))
  } catch (e) {
    console.log(e)
  }
}

start()
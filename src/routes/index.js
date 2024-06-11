import express from 'express'
import { Cryptographer } from '../services/cryptography.service.js';
import testing from './test.routes.js'
// import auth from './auth.routes.js'
// import user from './user.routes.js'
// import organisation from './organisation.routes.js'
import admin from './admin.routes.js'
// import posts from './posts.routes.js'

const router = express.Router();

router.use((req, res, next) => {
  try{
    console.log(`[${new Date()?.toISOString()}] INFO : ${req?.method} ${req?.path}`)
  } catch(e) {
    console.log(`[${new Date()?.toISOString()}] ERROR : ${e}`)
  } finally {
    next()
  }
})


router.use('/test', testing);
// router.use('/auth', auth);
// router.use('/posts', posts);
// router.use('/user', user);
// router.use('/organisation', organisation);
router.use('/admin', admin)

router.get('/status', (req, res) => {
    res.status(200).send('OK!')
})

export default router;
import { validationResult } from "express-validator";
import authService from '../services/auth.service.js'

const registrate = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors})
    }

    const params = req.body;
    const reg = await authService.registrate(params);
    console.log(reg.error);

    const accessToken = generateAccessToken(reg.user.id);
    const refreshToken = generateRefreshToken(reg.user.id);

    const success = reg.code == 200;   
    return res.status(reg.code).json({success: success, accessToken: accessToken, refreshToken: refreshToken, errors: reg.error})

  } catch (exc) {
    return res.status(400).json({success: false, error: String(exc)})

  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const login = await authService.login({email: email, password: password})

    const success = login.code == 200;   
    if(login.user == undefined)

    return res.status(400).json({success: false, errors: login.error}) 

    const accessToken = generateAccessToken(login.user.id);
    const refreshToken = generateRefreshToken(login.user.id);

    return res.status(login.code).json({success: success, accessToken: accessToken, refreshToken: refreshToken, errors: login.error})
  } catch (e) {
    return res.status(400).json({success: false, error: String(exc)})

  }
}

export {
  registrate,
  login
}
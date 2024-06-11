import { validationResult } from "express-validator";
import authService from '../services/auth.service.js'
import { generateAccessToken, generateRefreshToken } from "../services/jwt.service.js";

const registrateAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors})
    }

    const params = req.body;
    const reg = await authService.registrateAdmin(params);
    console.log(reg.error);
    const success = reg.code == 200;   

    if(!reg.error){
      const accessToken = generateAccessToken(0);
      const refreshToken = generateRefreshToken(0);
      return res.status(reg.code).json({success: success, user: reg.user, accessToken: accessToken, refreshToken: refreshToken, errors: reg.error})
    }
    
    return res.status(reg.code).json({success: success, errors: reg.error})

  } catch (exc) {
    return res.status(400).json({success: false, error: String(exc)})
  }
}


const loginAdmin = async (req, res, next) => {
  try {
    const { login, password } = req.body

    const loginResult = await authService.loginAdmin({login: login, password: password})

    const success = loginResult.code == 200;   
    if(loginResult.user == undefined)
      return res.status(400).json({success: false, errors: loginResult.error}) 

    const accessToken = generateAccessToken(loginResult.user.id);
    const refreshToken = generateRefreshToken(loginResult.user.id);

    return res.status(loginResult.code).json({success: success,user: loginResult.user, accessToken: accessToken, refreshToken: refreshToken, errors: loginResult.error})
  } catch (exc) {
    return res.status(400).json({success: false, error: String(exc)})

  }
}

export {
  registrateAdmin,
  loginAdmin
}

import CryptoJS from "crypto-js";
import { TELEGRAM_BOT_TOKEN } from "../config.js";

export const verifyTelegramWebAppData = async (telegramInitData) => {
  try {
    const initData = new URLSearchParams(telegramInitData);
    const hash = initData.get("hash");

    let dataToCheck = [];
    
    initData.sort();
    initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));
    
    const secret = CryptoJS.HmacSHA256(TELEGRAM_BOT_TOKEN, "WebAppData");
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);
    return {valid: _hash === hash, user: JSON.parse(Object.fromEntries(initData).user)};
  }
  catch (e){
    return {valid: false, user: null};
  }
}

export async function validateTgAuthData(req, res, next) {
  try{
    const payload = req.body.data;
    const validationResult = await verifyTelegramWebAppData(payload)

    if (validationResult.valid === true) {
      req.user = {...validationResult.user}
      next()
    }
    else return res.status(400).json({success: false, error: 'Invalid auth payload', params: payload}).send()
  }
  catch (e) {
    return res.status(400).json({success: false, error: String(e), params: payload}).send()
  }
  

}
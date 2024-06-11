import { Cryptographer } from "../services/cryptography.service.js";
import { verifyLaunchParams } from "../services/vkCrypro.service.js";

export function validatePayload(req, res, next) {
  const payload = req.query;

  const validationResult = Cryptographer.ValidateVkData(payload)
  
  if (validationResult.valid === true) {
    req.signParams = {...validationResult.params}
    next()
  }
  else return res.status(400).json({success: false, params: {...validationResult.params}}).send()

}

export function validateBodyPayload(req, res, next) {
  const payload = req.body;

  const validationResult = Cryptographer.ValidateVkData(payload)
  
  if (validationResult.valid === true) {
    req.signParams = {...validationResult.params}
    next()
  }
  else return res.status(400).json({success: false, params: payload}).send()

}


export function validateStartParams(req, res, next)
{
  const validationResult = verifyLaunchParams(req.query)
  if(validationResult.success === true)
  {
    req.startParams = {...validationResult.params}
    req.signParams = {...validationResult.params}
    next()
  }
  else return (res.status(400).json({success: false, params: {...validationResult.params}}).send())

}
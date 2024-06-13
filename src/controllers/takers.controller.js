import { createNewTaker, extractTakerData, getTakersByParams } from "../services/takers.service.js"

const getTakers = async (req, res, next) => {
  const usid = req.user.id
  const result =  await getTakersByParams(usid, req.query)
  const success = result.code == 200

  return res.status(result.code).json({success: success, req_usid: usid, ...result})
}

const createTaker = async (req, res, next) => {
  const usid = req.user.id

  return res.status(200).json({success: true, req_usid: usid, result: await createNewTaker(usid, req.body)})
}

const extractActionData = async (req, res, next) => {
  const usid = req.user.id;
  const result = await extractTakerData(usid, req.body.id)

  res.status(200).json({success: true, data: result})
}

export {
  getTakers,
  createTaker,
  extractActionData
}
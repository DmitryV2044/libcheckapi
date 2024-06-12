import { createNewTaker, getTakersByParams, takeNewBook } from "../services/takers.service.js"

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

const takeBook = async (req, res, next) => {
  const usid = req.user.id
  const params = req.body
  const result = await takeNewBook({...params, admin_id: usid})

  return res.status(200).json({success: true, req_usid: usid, result: result})

}

export {
  getTakers,
  createTaker,
  takeBook
}
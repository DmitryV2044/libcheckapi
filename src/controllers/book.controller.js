import { tryReturnBook, tryTakeBook } from "../services/book.service.js"

const takeBook = async (req, res, next) => {
  const usid = req.user.id
  const params = req.body
  const result = await tryTakeBook({...params, admin_id: usid})

  return res.status(200).json({success: true, req_usid: usid, result: result})
}

const returnBook = async (req, res, next) => {
  const usid = req.user.id
  const params = req.body
  const result = await tryReturnBook({...params, admin_id: usid})

  return res.status(200).json({success: true, req_usid: usid, result: result})

}

export {
  takeBook,
  returnBook
}
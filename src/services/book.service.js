import { ActionType } from "../enums/lib.enum.js";
import { createActionRecord, extractActionData } from "../helpers/actions.helper.js";
import { dechipherLibtakers } from "../helpers/dechipher.helper.js";
import { getLibForAdmin } from "../helpers/lib_admin_coordination.helper.js";
import { BooksDb } from "../models/book.model.js";
import { TakersDb } from "../models/takers.model.js";

const tryTakeBook = async ({admin_id, taker_id, book_id}) => {
  const lib = await getLibForAdmin(admin_id);
  const bdb = new BooksDb(lib.books_tb)

  /**
   * @type {Book}
   */
  const bookRecord = (await bdb.GetById(book_id))

  if(!bookRecord)
    return{ book_taken: false, reason: 'book not found'}

  if(bookRecord?.availible_count <= 0)
    return {book_taken: false, reason: 'not enough books in the storage'}

  const newBookRecord = await bdb.TakeOneBook(book_id)

  const db = new TakersDb(lib.takers_tb)

  /**
   * @type {Libtaker}
   */
  const taker = (await dechipherLibtakers([await db.GetById(taker_id)]))[0]

  const action = createActionRecord(book_id, ActionType.Take)
  taker.actions = taker.actions.concat(action)
  
  db.RewriteActions(taker_id, JSON.stringify(taker.actions))
  return {book_taken: true, taker: taker, book: newBookRecord, action_done: action}
}


const tryReturnBook = async ({admin_id, taker_id, book_id}) => {
  const lib = await getLibForAdmin(admin_id);
  const bdb = new BooksDb(lib.books_tb)

  /**
   * @type {Book}
   */
  const bookRecord = (await bdb.GetById(book_id))

  if(!bookRecord)
    return { book_returned: false, reason: 'book not found'}

  const db = new TakersDb(lib.takers_tb)

  /**
   * @type {Libtaker}
   */
  const taker = (await dechipherLibtakers([await db.GetById(taker_id)]))[0]

  const actions = await extractActionData(taker.actions)

  if(! actions.owed_books.includes(book_id)){
    return { book_returned: false, reason: 'book was not taken by this user'}
  }

  const newBookRecord = await bdb.ReturnOneBook(book_id)
  
  const action = createActionRecord(book_id, ActionType.Return)
  taker.actions = taker.actions.concat(action)
  
  db.RewriteActions(taker_id, JSON.stringify(taker.actions))
  return {book_returned: true, taker: taker, book: newBookRecord, action_done: action}
}

export {
  tryTakeBook,
  tryReturnBook
}
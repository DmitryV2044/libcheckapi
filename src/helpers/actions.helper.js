import { ActionType } from "../enums/lib.enum.js"

/**
 * @param {Date | string} time 
 * @param {number} type 
 * @returns {BookActionRecord}
 */
const createActionRecord = (book_id, type = 0, time = new Date().toISOString()) => {
 return {time: time, book_id: book_id, action: type}
}


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

/**
 * @param {Array<BookActionRecord>} actions 
 */
const extractActionData = async (actions) => {
  let books_taken = 0
  let books_returned = 0
  let owed_books = []
  let taken_books = []
  let returned_books = []

  actions?.forEach(action => {
    switch(action.action){
      case ActionType.Take:
        books_taken++
        taken_books = taken_books.concat(action.book_id)
        owed_books = owed_books.concat(action.book_id)
        break;
      
      case ActionType.Return:
        books_returned++
        if(owed_books.includes(action.book_id))
          removeItemOnce(owed_books, action.book_id)
        returned_books = returned_books.concat(action.book_id)
        break;
      
      default:
        console.log('unknown action')
    }
  });

  return {books_taken, books_returned, owed_books, taken_books, returned_books}
}

export {
  createActionRecord,
  extractActionData
}
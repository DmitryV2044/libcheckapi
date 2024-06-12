
/**
 * 
 * @param {Date | string} time 
 * @param {number} type 
 * @returns {BookActionRecord}
 */
const createActionRecord = (book_id, type = 0, time = new Date().toISOString()) => {
 return {time: time, book_id: book_id, action: type}
}

export {
  createActionRecord
}
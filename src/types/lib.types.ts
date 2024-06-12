type Library = {
  id: number,
  name: string,
  description: string | null,
  takers_tb: string | null,
  books_tb: string | null
}

type BookActionRecord = {
  time: Date,
  book_id: number | string | undefined,
  /**
   * 1 - take; 2 - returned; 3 - brought
   */
  action: number,
}
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
type Libtaker = {
  id: number,
  name: string,
  surname: string,
  third_name: string | null
  taken_books: Array<any> | null,
  grade: number | null,
  role: string | null,
  actions: Array<BookActionRecord>
}

type LibtakerRegistrationData = {
  name: string,
  surname: string,
  third_name: string | null,
  grade: number | null,
  role: number | null
}

type Book = {
  name: string,
  description: string | null,
  photo_url: string | null,
  total_count: number,
  availible_count: number,
  author: string | null
}
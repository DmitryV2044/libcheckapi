import { CustomDb } from "./customdb.model.js";
import db from "../database.js";

export class BooksDb extends CustomDb
{
  async TakeOneBook(id) {
    try{
      return (await db.query(`UPDATE ${this.table_name} SET availible_count = availible_count - 1 WHERE id = $1 RETURNING *`, [id])).rows[0]
    }
    catch(e)
    {
      return {...e, error_occured: true};
    }
  }

  async ReturnOneBook(id) {
    try{
      return (await db.query(`UPDATE ${this.table_name} SET availible_count = availible_count + 1 WHERE id = $1 RETURNING *`, [id])).rows[0]
    }
    catch(e)
    {
      return {...e, error_occured: true};
    }
  }
  
  
}
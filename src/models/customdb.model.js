import db from "../database.js";

export class CustomDb
{ 

  constructor(table_name){
    this._table_name = `public.${table_name}`
  }

  get table_name() {
    return this._table_name;
  }

  /**
   * @param {number | string} id 
   * @returns {Promise<Libtaker> | Promise<Book>}
   */
  async GetById(id)
  {
    try{
      return (await db.query(`SELECT * FROM ${this.table_name} WHERE id = $1`, [id])).rows[0]
    }
    catch(e)
    {
      return {...e, error_occured: true};
    }
  }

  /**
   * @returns {Promise<Array<Libtaker>> | Promise<Array<Book>>}
   */
  async GetAll()
  {
    try{
      return (await db.query(`SELECT * FROM ${this.table_name} `)).rows
    }
    catch(e)
    {
      return {...e, error_occured: true};
    }
  }

  /**
   * @param {*} param0 
   * @returns {Promise<Array<Libtaker>> | Promise<Array<Book>>}
   */
  async GetAllByQuery({query, values})
  {
    try{
      return (await db.query(`SELECT * FROM ${this.table_name} ` + query, values)).rows
    }
    catch(e)
    {
      return {...e, error_occured: true};
    }
  }
  
}
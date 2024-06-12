import db from "../database.js";
import { Cryptographer } from "../services/cryptography.service.js";

export class TakersDb
{ 
  constructor(table_name){
    this.table_name = `public.${table_name}`
  }

  async RewriteActions(taker_id, actions) {
    try{
      return (await db.query(`UPDATE ${this.table_name} SET actions = $1 WHERE id = $2`, [actions, taker_id])).rows[0]
    }
    catch(e)
    {
      return {...e, error_occured: true};
    }
  }

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
   * 
   * @param {*} param0 
   * @returns {Promise<Array<Libtaker>>}
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

  /**
   * 
   * @param {number | string} id 
   * @returns {Promise<Libtaker>}
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



  async CreateUser({name, surname, third_name = null, grade = null, role = null}) {
    console.log(name)
  try
  {
    return (await db.query(
      `INSERT INTO ${this.table_name} (name, surname, third_name, grade, role)
      VALUES($1, $2, $3, $4, $5) 
      RETURNING *`, [
        Cryptographer.instance.EncodeString(name), 
        Cryptographer.instance.EncodeString(surname),
        Cryptographer.instance.EncodeString(third_name),
        grade,
        role
      ])).rows[0];
  }
  catch(e)
  {
    return {...e, error_occured: true};
  }
  
}

}

// const TABLE_NAME = 'public.libadmins'

// const getAll = async () =>
//   (await db.query(`SELECT * FROM ${TABLE_NAME}`)).rows

//   const getAllFiltered = async (params) =>
//   (await db.query(`SELECT * FROM ${TABLE_NAME}`)).rows

// const getAdminById = async (id) =>
//   (await db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id])).rows[0]
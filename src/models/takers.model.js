import db from "../database.js";
import { Cryptographer } from "../services/cryptography.service.js";
import { CustomDb } from "./customdb.model.js";

export class TakersDb extends CustomDb
{ 

  async RewriteActions(taker_id, actions) {
    try{
      return (await db.query(`UPDATE ${this.table_name} SET actions = $1 WHERE id = $2`, [actions, taker_id])).rows[0]
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

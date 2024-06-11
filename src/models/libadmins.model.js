import db from "../database.js";
import { Cryptographer } from "../services/cryptography.service.js";

const TABLE_NAME = 'public.libadmins'

const getAll = async () =>
  (await db.query(`SELECT * FROM ${TABLE_NAME}`)).rows

const getAdminById = async (id) =>
  (await db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id])).rows[0]

const getAdminByLogin = async (login) =>
  (await db.query(`SELECT * FROM ${TABLE_NAME} WHERE login = $1`, [Cryptographer.instance.EncodeString(login)])).rows[0]

const modifyOrCreateUser = async ({name, login, password}) => {
  try
  {
    return (await db.query(
      `INSERT INTO ${TABLE_NAME} (name, login, password)
      VALUES($1, $2, $3) 
      ON CONFLICT (id) 
      DO 
         UPDATE SET name = EXCLUDED.name, login = EXCLUDED.login, password = EXCLUDED.password
      RETURNING *`, [
        Cryptographer.instance.EncodeString(name), 
        Cryptographer.instance.EncodeString(login),
        Cryptographer.instance.EncodeString(password)
      ])).rows[0];
  }
  catch(e)
  {
    return false;
  }
  
}

  
export {
  modifyOrCreateUser,
  getAdminById,
  getAdminByLogin,
  getAll
}




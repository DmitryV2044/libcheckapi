import db from "../database.js";
import { Cryptographer } from "../services/cryptography.service.js";

const TABLE_NAME = 'public.libraries'

const getAll = async () =>
  (await db.query(`SELECT * FROM ${TABLE_NAME}`)).rows

const getLibById = async (id) =>
  (await db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id])).rows[0]

export{
  getAll,
  getLibById
}
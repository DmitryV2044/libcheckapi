import { TakersDb } from "../models/takers.model.js";
import { buildQueryForParams } from "../helpers/dbquery.helper.js";
import { getLibForAdmin } from "../helpers/lib_admin_coordination.helper.js";
import { Cryptographer } from "./cryptography.service.js";
import { dechipherLibtakers } from "../helpers/dechipher.helper.js";
import { createActionRecord } from "../helpers/actions.helper.js";

const getTakersByParams = async (admin_id, params) => {
  
  const lib = await getLibForAdmin(admin_id)

  const db = new TakersDb(lib.takers_tb)
  const filter = buildQueryForParams(params)
  const takers = await db.GetAllByQuery(filter)

  if(takers.error_occured)
    return {code: 400, error: takers}

  const result = await dechipherLibtakers(takers)

  return { tdb: lib.takers_tb, result: result, code: 200, error: '' };
};

/**
 * @param {number} admin_id
 * @param {LibtakerRegistrationData} regData 
 * @returns {Promise<Libtaker>}
 */
const createNewTaker = async (admin_id, regData) => {
  const lib = await getLibForAdmin(admin_id)
  console.log(lib.takers_tb)
  const db = new TakersDb(lib.takers_tb)

  const user = await db.CreateUser({...regData});

  return { user: user, code: 200, error: '' };
};

const takeNewBook = async ({admin_id, taker_id, book_id}) => {
  const lib = await getLibForAdmin(admin_id);
  const db = new TakersDb(lib.takers_tb)
  const taker = await db.GetById(taker_id)

  taker.actions = JSON.parse(taker.actions)
  const action = createActionRecord(book_id, 1)
  taker.actions = taker.actions.concat(action)
  
  db.RewriteActions(taker_id, JSON.stringify(taker.actions))

  return {taker: taker, action_done: action}
}

export{
  getTakersByParams,
  createNewTaker,
  takeNewBook
}

import { TakersDb } from "../models/takers.model.js";
import { buildQueryForParams } from "../helpers/dbquery.helper.js";
import { getLibForAdmin } from "../helpers/lib_admin_coordination.helper.js";
import { dechipherLibtakers } from "../helpers/dechipher.helper.js";
import { extractActionData } from "../helpers/actions.helper.js";

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
  const db = new TakersDb(lib.takers_tb)

  const user = await db.CreateUser({...regData});

  return { user: user, code: 200, error: '' };
};

const extractTakerData = async (admin_id, taker_id) => {
  const lib = await getLibForAdmin(admin_id)
  const db = new TakersDb(lib.takers_tb)

  /**
   * @type {Libtaker}
   */
  const taker = await db.GetById(taker_id);
  const dTaker = (await dechipherLibtakers([taker]))[0]
  console.log(dTaker)

  const result = await extractActionData(dTaker.actions)
  return result
}

export{
  getTakersByParams,
  createNewTaker,
  extractTakerData
}

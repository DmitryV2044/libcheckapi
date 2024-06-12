import { getLibById } from "../models/lib.model.js"
import { getAdminById } from "../models/libadmins.model.js"

/**
 * 
 * @param {number | string} admin_id 
 * @returns {Promise<Library>}
 */
const getLibForAdmin = async (admin_id) => {
  const admin = await getAdminById(admin_id)
  const lib = await getLibById(admin.admin_at)
  return lib
}

export {
  getLibForAdmin
}
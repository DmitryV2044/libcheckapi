import { Cryptographer } from "../services/cryptography.service.js"

/**
 * @param {Array<Libtaker>} libtakers 
 */
const dechipherLibtakers = async (libtakers) => {
  for(let i = 0; i < libtakers.length; i++){
    try{
      libtakers[i].name = Cryptographer.instance.DecodeString(libtakers[i].name)
      libtakers[i].surname = Cryptographer.instance.DecodeString(libtakers[i].surname)
      // libtakers[i].third_name = Cryptographer.instance.DecodeString(libtakers[i].name)
    }
    catch{
      console.log('error occured when dechipher libtaker, skipping...')
    }
  }
  return libtakers
}

export {
  dechipherLibtakers
}
import { Cryptographer } from "../services/cryptography.service.js"

const TakerEncryptedFileds = ['name', 'surname', 'third_name']
const TakerAllowedFileds = ['id', 'name', 'surname', 'third_name', 'grade', 'role']

/**
 * @param {Libtaker} parameters 
 */
const buildQueryForParams = (parameters) => {
  try{
    if(!parameters) 
      return null

    let query = 'WHERE '
    let values = []
    let i = 0
    for (const [key, value] of Object.entries(parameters)) {
      if(TakerAllowedFileds.includes(key) === false) {
        console.log('unauthorized parameter, skipping')
        continue;
      }

      if(TakerEncryptedFileds.includes(key))
        values = values.concat(Cryptographer.instance.EncodeString(value))
      else
        values = values.concat(value)

      i++
      query += `${key} = $${i} AND `
    }
    query = query.slice(0, -4)

    return {query: query, values: values}
  }
  catch(exc){
    console.log(exc)
    return {query: '', values: []}
  }
}

export {
  buildQueryForParams
}

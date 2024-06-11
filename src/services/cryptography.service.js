import crypto from 'crypto'
import bcrypt from 'bcrypt'
// import { saltRounds } from '../cryptoConfig.js';

/**
 * @property {*} algorithm
 */
export class Cryptographer
{ 
  /**
   * @type {Cryptographer}
   */
  static instance = null

  constructor(algorithm, initVector, Securitykey)
  {
    if (Cryptographer.instance) {
      return Cryptographer.instance
    }

    this.algorithm = algorithm;
    this.initVector = initVector;
    this.Securitykey = Securitykey;
    console.log('crypto service online')
    Cryptographer.instance = this;
  }

  static async Hash(data) 
  {
    let res;
    res = await bcrypt.hash(data, process.env.saltRounds)
    return res;
  }   

  async Hash(data)
  {
    return await Cryptographer.Hash(data);
  }

  EncodeString(data)
  {
    let cipher = crypto.createCipheriv(this.algorithm, this.Securitykey, this.initVector);
    let encryptedData = cipher.update(data, "utf-8", "hex");

    encryptedData += cipher.final("hex");
    // console.log("Encrypted message: " + encryptedData);
    return encryptedData;
  }

  DecodeString(data)
  {
    let decipher = crypto.createDecipheriv(this.algorithm, this.Securitykey, this.initVector);
    let decryptedData = decipher.update(data, "hex", "utf-8");

    decryptedData += decipher.final("utf8");
    // console.log("Decrypted message: " + decryptedData);
    return decryptedData;
  }

}
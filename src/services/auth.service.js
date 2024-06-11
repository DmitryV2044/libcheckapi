import * as AdminModel from '../models/libadmins.model.js' 
import { Cryptographer } from './cryptography.service.js';


const registrate = async (authData) => {
  const existingUser = await AuthUser.getUserByEmail(authData.email);

  if (existingUser != null) {
    return {error: `User already exists`, code: 400}
  }

  const user = await AuthUser.addUser({password: authData.password, login: 'default', email: authData.email});
  const dataUser = await UserData.modifyOrCreateUser({id: user.id, name: 'not set', surname: 'not set'})

  return { user: user, code: 200, error: '' };
};


const registrateAdmin = async (authData) => {
  const existingUser = await AdminModel.getAdminByLogin(authData.login);

  if (existingUser != null) {
    return {error: `User already exists`,user: existingUser, code: 400}
  }

  const user = await AdminModel.modifyOrCreateUser({password: authData.password, login: authData.login, name: authData?.name});

  return { user: user, code: 200, error: '' };
};

const loginAdmin = async (authData) => {
  const existingUser = await AdminModel.getAdminByLogin(authData.login);

  if (existingUser?.password == Cryptographer.instance.EncodeString(authData?.password)) {
    return { user: existingUser, code: 200 };
  }

  return {error: `Incorrect credentials`, code: 400}
};



export default{
  registrate,
  registrateAdmin,
   loginAdmin
}
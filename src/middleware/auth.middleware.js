import { JWT_Secret } from "../cryptoConfig.js";
import jwt from 'jsonwebtoken'
import organisationService from '../services/organisation.service.js'
import userService from '../services/user.service.js'


export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, JWT_Secret, (err, {userId}) => {
      if (err) return res.sendStatus(403)
      req.user = { id: null }
      // console.log('userId in token: ' + userId)
      req.user.id = userId
      next()
    })
}

export function authenticateTokenOptional(req, res, next) {
  try {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log(token)
  if (token == undefined)
  {
    next()
    return
  } 

  jwt.verify(token, JWT_Secret, (err, {userId}) => {
    if (err) return res.status(403).json({success: false, error: String(err)})
    req.user = { id: null }
    // console.log('userId in token: ' + userId)
    req.user.id = userId
    next()
  })
}
catch (e) {
  return res.status(403).json({success: false, error: String(e)})
}
  
}

export function authenticateResetToken(req, res, next) 
{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, JWT_Secret, (err, {type, userId, resetId}) => {
    if (err) return res.sendStatus(403)

    req.user = { id: null, type: null, resetId: null}
    req.user.tokenType = type
    req.user.id = userId
    req.user.resetId = resetId

    // console.log('token type: ' + type + ' | userID: ' + userId + ' | reset_id: ' + resetId)
    if(type != 'reset_passwd' || (type == undefined || null))
      return res.sendStatus(400)

    next()
  })
}

export async function checkAdminRole(req, res, next)
{
  const userId = req.user.id,
    authorId = req.body.author_id

  if(authorId == null || undefined) 
    return res.sendStatus(400)
    
  const query = await userService.getUserOrganisations(userId)

  if(query.organisations == undefined || null)
    return res.sendStatus(403)

  const usrOrg = JSON.parse(query?.organisations);

  // console.log('aid: '+ authorId)
  const valid = usrOrg?.indexOf(Number(authorId)) != -1

  if(!valid || (usrOrg == undefined || null))
    return res.sendStatus(403)
  
  // console.log('query result: ' + JSON.parse(query.organisations))
  
  next()
}

export async function checkAdminRoleAny(req, res, next)
{
  const userId = req.user.id;

  const query = await userService.getUserOrganisations(userId)
  
  if(query.organisations == undefined || null)
    return res.sendStatus(403)

  const usrOrg = JSON.parse(query?.organisations);

  const valid = usrOrg?.length
  // console.log('l: ' + usrOrg?.length)

  if(!valid || (usrOrg == undefined || null))
    return res.sendStatus(403)
  
  // console.log('query result: ' + JSON.parse(query.organisations))
  
  next()
}
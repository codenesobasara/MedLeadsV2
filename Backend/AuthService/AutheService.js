const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.refresh_JWT_SECRET;


async function authCheck(email, password) {
const user = await User.findOne({where:{email}})
if(!user){return null}
const pswMatch = await bcrypt.compare(password,user.passwordHash)
if(!pswMatch){return null}
return user}

async function authorize(user){
const payload = {userid:user.id, email:user.email, role:user.role}
const accessToken = jwt.sign(payload, JWT_SECRET,{expiresIn:"1h"})
const refreshPayload = user.id
const refreshToken = jwt.sign(refreshPayload,REFRESH_JWT_SECRET,{expiresIn:"7d"})
return {accessToken, refreshToken}
}

async function createUser(email,password,role){
const pswHash = await bcrypt.hash(password, 10 )
const user = {email:email,passwordHash:pswHash,role:role}
const newUser = await User.create(user)
return newUser
}

module.exports = {authCheck, authorize,createUser}
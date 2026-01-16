const User = require("../models/Users");

async function getUserByEmail(email){
    const existingUser = await User.findOne({where:{email:email}})
    if(!existingUser){return null}
    return existingUser
}

async function getUserById(id) {
    const existingUser = await User.findByPk(id)
    if(!existingUser){return null}
    return existingUser 
}

module.exports={getUserByEmail, getUserById}
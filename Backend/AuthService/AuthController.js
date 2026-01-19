const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthService = require("./AutheService")
const UserFunctions = require("../UserService/UserFunctions")
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.refresh_JWT_SECRET;

async function refreshToken (req,res){
    try{
        const {refreshToken} = req.body
        if(!refreshToken){return res.status(400).json({message:"Missing Token"})}
        const verifyToken = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
        const userid = verifyToken.userid
        if(!userid){return res.status(401).json({message:"Invalid Token"})}
        const user = await UserFunctions.getUserById(userid)
        if(!user){return res.status(401).json({message:"Invalid Token"})}
        const tokens = AuthService.authorize(user)
        return res.status(200).json(tokens)
    }catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
}}

module.exports ={refreshToken}
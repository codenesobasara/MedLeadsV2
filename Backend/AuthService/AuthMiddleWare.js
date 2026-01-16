const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

function authMiddleWare(req,res,next){
    try {const authHeader = req.headers.authorization;
    if (!authHeader) { return res.status(401).json({ error: "no auth header" });}
     const split = authHeader.split(" ");
     if (split.length !== 2 || split[0] !== "Bearer") {
     return res.status(401).json({ error: "Invalid Authorization format" });
    }
    const token = split[1] 
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = {
        id: decoded.userid,
        role: decoded.role
    }  
    next()
  }catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
    
}}
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
    return res.status(401).json({ error: "Invalid or expired token" });// change to block
    
}}

function requireHost(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.user.role !== "host") {
    return res.status(403).json({ error: "Host access only" });
  }

  next();
}


function requireVendor(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.user.role !== "vendor") {
    return res.status(403).json({ error: "Host access only" });
  }

  next();
}


module.exports = {authMiddleWare, requireHost, requireVendor}
const crypto = require("crypto");






function generateInviteToken() {
  return crypto.randomBytes(32).toString("hex"); 
}

function hashInviteToken(rawToken) {
  const secret = process.env.EMAIL_SECRET
  return crypto
    .createHash("sha256")
    .update(rawToken + secret)
    .digest("hex");
}

module.exports = {
  generateInviteToken,
  hashInviteToken,
};
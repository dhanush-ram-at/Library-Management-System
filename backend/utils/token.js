const jwt = require("jsonwebtoken");
const { TOKEN } = require("../constants/appConfig");
 
// creates a short-lived access token (15 minutes)
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TOKEN.ACCESS_TOKEN_EXPERIATION });
};

// creates a long-lived refresh token (7 days)
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: TOKEN.REFERSH_TOKEN_EXPERIATION });
};

// verifies any token and returns the decoded data
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
 
module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
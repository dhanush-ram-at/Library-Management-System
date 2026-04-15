const jwt = require("jsonwebtoken");
const { TOKEN } = require("../constants/appConfig");
 
/**
 * @function generateAccessToken
 * @desc Generate a short-lived JWT access token
 * @access Internal (Utility)
 *
 * @param {Object} payload - Data to encode in token
 *
 * @returns {string} JWT access token
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TOKEN.ACCESS_TOKEN_EXPERIATION });
};


/**
 * @function generateRefreshToken
 * @desc Generate a long-lived JWT refresh token
 * @access Internal (Utility)
 *
 * @param {Object} payload - Data to encode in token
 *
 * @returns {string} JWT refresh token
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: TOKEN.REFERSH_TOKEN_EXPERIATION });
};


/**
 * @function verifyToken
 * @desc Verify JWT token and return decoded payload
 * @access Internal (Utility)
 *
 * @param {string} token - JWT token
 * @param {string} secret - Secret key used for verification
 *
 * @returns {Object} Decoded token payload
 *
 * @throws {Error} If token is invalid or expired
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
 
module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
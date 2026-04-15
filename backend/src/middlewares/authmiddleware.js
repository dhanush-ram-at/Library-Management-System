const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
const { verifyToken } = require("../../utils/token");

/**
 * @function protect
 * @desc Verify JWT access token and attach user details to request object
 * @access Protected (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.headers - Request headers
 * @param {string} req.headers.authorization - Bearer token
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if token is valid
 * @returns {Object} 401 - Unauthorized (No token / Invalid token)
 *
 * @modifies {Object} req.user - Adds authenticated user info
 * @modifies {number} req.user.id - User ID
 * @modifies {string} req.user.role - User role
 *
 * @throws {Error} If token verification fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // check header exists and starts with Bearer
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(STATUS.UNAUTHORIZED).json({
        code: STATUS.UNAUTHORIZED,
        status: STATUS_TEXT[STATUS.UNAUTHORIZED],
        message: AUTH.NO_TOKEN,
      });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(STATUS.UNAUTHORIZED).json({
        code: STATUS.UNAUTHORIZED,
        status: STATUS_TEXT[STATUS.UNAUTHORIZED],
        message: AUTH.NO_TOKEN,
      });
    }

    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();

  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).json({
      code: STATUS.UNAUTHORIZED,
      status: STATUS_TEXT[STATUS.UNAUTHORIZED],
      message: AUTH.INVALID_TOKEN,
    });
  }
};

module.exports = protect;
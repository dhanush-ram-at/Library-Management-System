const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
 
/**
 * @function validateRegister
 * @desc Validate register request body (name, email, password)
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.name - User name
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if validation passes
 * @returns {Object} 400 - Validation error response
 *
 * @throws {Error} If required fields are missing or invalid
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
 
  // name is required
  if (!name) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.NAME_REQUIRED,
    });
  }
 
  // email is required
  if (!email) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.EMAIL_REQUIRED,
    });
  }
 
  // email format must have @ and a dot  e.g. user@example.com
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.EMAIL_INVALID_FORMAT,
    });
  }
 
  // password is required
  if (!password) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.PASSWORD_REQUIRED,
    });
  }
 
  next();
};
 
/**
 * @function validateLogin
 * @desc Validate login request body (email, password)
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if validation passes
 * @returns {Object} 400 - Validation error response
 *
 * @throws {Error} If required fields are missing
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
 
  if (!email) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.EMAIL_REQUIRED,
    });
  }
 
  if (!password) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.PASSWORD_REQUIRED,
    });
  }
 
  next();
};
 
/**
 * @function validateRefresh
 * @desc Validate refresh token request body
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.refreshToken - Refresh token
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if validation passes
 * @returns {Object} 400 - Validation error response
 *
 * @throws {Error} If refresh token is missing
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const validateRefresh = (req, res, next) => {
  const { refreshToken } = req.body;
 
  if (!refreshToken) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: AUTH.TOKEN_REQUIRED,
    });
  }
 
  next();
};
 
module.exports = { validateRegister, validateLogin, validateRefresh };
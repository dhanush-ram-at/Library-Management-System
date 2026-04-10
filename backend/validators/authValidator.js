const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
 
// validates register request body
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
 
// validates login request body
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
 
// validates refresh token request body
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
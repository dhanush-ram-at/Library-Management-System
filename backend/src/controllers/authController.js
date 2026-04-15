const authService = require("../services/authService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
const { toRegisterInput, toLoginInput } = require("../DTOs/authDTO");

/**
 * @route POST /api/v1/auth/register
 * @desc Register a new user
 * @access Public
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
 * @returns {Object} 201 - User registered successfully
 * @returns {Object} returns.data - Empty array
 *
 * @throws {Error} 400 - Validation error / User already exists
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const register = async (req, res, next) => {
  try {
    const input = toRegisterInput(req.body);

    await authService.register(input);

    return res.status(STATUS.CREATED).json({
      code: STATUS.CREATED,
      status: STATUS_TEXT[STATUS.CREATED],
      message: AUTH.REGISTER_SUCCESS,
      data: [],
    });

  } catch (error) {
    next(error);
  }
};


/**
 * @route POST /api/v1/auth/login
 * @desc Authenticate user and generate access and refresh tokens
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Login successful
 * @returns {Object} returns.data - Token response
 * @returns {string} returns.data.accessToken - JWT access token
 * @returns {string} returns.data.refreshToken - JWT refresh token
 *
 * @throws {Error} 400 - Invalid credentials
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const login = async (req, res, next) => {
  try {
    const input = toLoginInput(req.body);

    const result = await authService.login(input);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: AUTH.LOGIN_SUCCESS,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};


/**
 * @route POST /api/v1/auth/refresh
 * @desc Generate new access token using refresh token
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.refreshToken - Refresh token
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - New access token generated
 * @returns {Object} returns.data - Token response
 * @returns {string} returns.data.accessToken - New access token
 *
 * @returns {Object} 400 - Refresh token missing
 * @returns {Object} 401 - Invalid or expired refresh token
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const result = await authService.refresh(refreshToken);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: AUTH.REFRESH_TOKEN_REFRESHED,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refresh };
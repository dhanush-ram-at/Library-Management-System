const bcrypt = require("bcrypt");
const authRepo = require("../repositories/authRepository");

const APP_CONFIG = require("../constants/appConfig");
const { STATUS } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");

const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/token");

//const { formatUser, loginResponseDTO } = require("../DTOs/authDTO");


/**
 * @function register
 * @desc Register a new user with hashed password
 * @access Public (Service)
 *
 * @param {Object} data - Request DTO
 * @param {string} data.name - User name
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @param {string} [data.role] - User role (optional)
 *
 * @returns {Object} Created user object
 *
 * @throws {Error} If email already exists
 * @throws {Error} If registration fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const register = async (data) => {
  try {
    const existing = await authRepo.getUserByEmail(data.email);

    if (existing) {
      const error = new Error(AUTH.EMAIL_ALREADY_EXISTS);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      APP_CONFIG.BCRYPT_ROUNDS
    );

    const user = await authRepo.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "MEMBER",
    });

    return user;

  } catch (error) {
    const err = new Error(`${AUTH.REGISTER_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @function login
 * @desc Authenticate user and generate JWT tokens
 * @access Public (Service)
 *
 * @param {Object} data - Request DTO
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 *
 * @returns {Object} Login response
 * @returns {Object} returns.user - Formatted user data
 * @returns {string} returns.accessToken - JWT access token
 * @returns {string} returns.refreshToken - JWT refresh token
 *
 * @throws {Error} If user not found
 * @throws {Error} If password is invalid
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const login = async (data) => {
  try {
    const user = await authRepo.getUserByEmail(data.email);

    if (!user) {
      const error = new Error(AUTH.USER_NOT_FOUND);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      const error = new Error(AUTH.INVALID_PASSWORD);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const payload = { id: user.id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return await authRepo.loginUser(user, accessToken, refreshToken);

  } catch (error) {
    const err = new Error(`${AUTH.LOGIN_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @function refresh
 * @desc Generate new access token using refresh token
 * @access Public (Service)
 *
 * @param {string} refreshToken - Refresh token
 *
 * @returns {Object} Token response
 * @returns {string} returns.accessToken - New access token
 *
 * @throws {Error} If refresh token is invalid or expired
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const refresh = async (refreshToken) => {
  try {
    const decoded = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    return {
      accessToken: generateAccessToken({
        id: decoded.id,
        role: decoded.role,
      }),
    };

  } catch (error) {
    const err = new Error(`${AUTH.REFRESH_TOKEN_INVALID}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};

module.exports = { register, login, refresh };
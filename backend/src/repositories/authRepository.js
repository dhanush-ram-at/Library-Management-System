const authDAL = require("../DAL/authDAL");
const { formatUser } = require("../DTOs/authDTO");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");
const { loginResponseDTO } = require("../DTOs/authDTO");

/**
 * @function createUser
 * @desc Create a new user and apply response DTO
 * @access Internal (Service)
 *
 * @param {Object} data - User data payload
 * @param {string} data.name - User name
 * @param {string} data.email - User email
 * @param {string} data.password - Hashed password
 * @param {string} [data.role] - User role
 *
 * @returns {Promise<Object>} Formatted user object
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const createUser = async (data) => {
  try {
    const user = await authDAL.create({ data });
    return formatUser(user);

  } catch (error) {
    const err = new Error(`${REPO.CREATE_USER_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @function getUserByEmail
 * @desc Fetch a user by email (raw data for authentication)
 * @access Internal (Service)
 *
 * @param {string} email - User email
 *
 * @returns {Promise<Object|null>} User object if found, otherwise null
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getUserByEmail = async (email) => {
  try {
    return await authDAL.findByEmail({ where: { email } });

  } catch (error) {
    const err = new Error(`${REPO.FIND_USER_EMAIL_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @function loginUser
 * @desc Fetch a user by ID and apply response DTO
 * @access Internal (Service)
 *
 * @param {number} id - User ID
 *
 * @returns {Promise<Object|null>} Formatted user object if found, otherwise null
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const loginUser = async (user, accessToken, refreshToken) => {
  try {
    // store refresh token in DB
    await authDAL.updateRefreshToken({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
    });

    // return DTO
    return loginResponseDTO(user, accessToken, refreshToken);

  } catch (error) {
    const err = new Error(`${REPO.LOGIN_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};

module.exports = { createUser, getUserByEmail, loginUser };
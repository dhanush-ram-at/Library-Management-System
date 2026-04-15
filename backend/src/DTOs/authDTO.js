// REQUEST DTO
/**
 * @function toRegisterInput
 * @desc Transform request body into register DTO format
 * @access Internal (DTO)
 *
 * @param {Object} body - Request payload
 * @param {string} body.name - User name
 * @param {string} body.email - User email
 * @param {string} body.password - User password
 * @param {string} [body.role] - User role (optional)
 *
 * @returns {Object} Formatted register DTO
 * @returns {string} returns.name - User name
 * @returns {string} returns.email - User email
 * @returns {string} returns.password - User password
 * @returns {string} returns.role - User role
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const toRegisterInput = (body) => ({
  name: body.name,
  email: body.email,
  password: body.password,
  role: body.role || "MEMBER",
});

/**
 * @function toLoginInput
 * @desc Transform request body into login DTO format
 * @access Internal (DTO)
 *
 * @param {Object} body - Request payload
 * @param {string} body.email - User email
 * @param {string} body.password - User password
 *
 * @returns {Object} Formatted login DTO
 * @returns {string} returns.email - User email
 * @returns {string} returns.password - User password
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const toLoginInput = (body) => ({
  email: body.email,
  password: body.password,
});


// RESPONSE DTO

/**
 * @function formatUser
 * @desc Transform user DB object into API response format (remove sensitive fields)
 * @access Internal (DTO)
 *
 * @param {Object} user - User DB object
 * @param {number} user.id - User ID
 * @param {string} user.name - User name
 * @param {string} user.email - User email
 * @param {string} user.role - User role
 * @param {string} user.created_at - Created timestamp
 *
 * @returns {Object} Formatted user response
 * @returns {number} returns.id - User ID
 * @returns {string} returns.name - User name
 * @returns {string} returns.email - User email
 * @returns {string} returns.role - User role
 * @returns {string} returns.created_at - Created timestamp
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const formatUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  created_at: user.created_at,
});

/**
 * @function loginResponseDTO
 * @desc Format user data and tokens into login response DTO
 * @access Internal (DTO)
 *
 * @param {Object} user - User DB object
 * @param {string} accessToken - JWT access token
 * @param {string} refreshToken - JWT refresh token
 *
 * @returns {Object} Formatted login response DTO
 * @returns {number} returns.id - User ID
 * @returns {string} returns.name - User name
 * @returns {string} returns.email - User email
 * @returns {string} returns.role - User role
 * @returns {string} returns.accessToken - Access token
 * @returns {string} returns.refreshToken - Refresh token
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const loginResponseDTO = (user, accessToken, refreshToken) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  accessToken,
  refreshToken,
});


module.exports = { toRegisterInput, toLoginInput, formatUser, loginResponseDTO };
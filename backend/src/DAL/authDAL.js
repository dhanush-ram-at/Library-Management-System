const prisma = require("../config/prismaClient");
const DB = require("../constants/errorMessages/db");

/**
 * Create a new user
 *
 * @param {Object} query - Prisma query object
 * @param {Object} query.data - User data
 * @param {string} query.data.name - User name
 * @param {string} query.data.email - User email
 * @param {string} query.data.password - Hashed password
 * @param {string} [query.data.role] - User role
 *
 * @returns {Promise<Object>} Created user object
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const create = async (query) => {
  try {
    return await prisma.users.create(query);
  } catch (error) {
    throw new Error(`${DB.CREATE_USER_FAILED}: ${error.message}`);
  }
};


/**
 * Find a user by email
 *
 * @param {Object} query - Prisma query object
 * @param {Object} query.where - Where condition
 * @param {string} query.where.email - User email
 *
 * @returns {Promise<Object|null>} User object if found, otherwise null
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const findByEmail = async (query) => {
  try {
    return await prisma.users.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_USER_BY_EMAIL_FAILED}: ${error.message}`);
  }
};


/**
 * Find a user by ID
 *
 * @param {Object} query - Prisma query object
 * @param {Object} query.where - Where condition
 * @param {number} query.where.id - User ID
 *
 * @returns {Promise<Object|null>} User object if found, otherwise null
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const findById = async (query) => {
  try {
    return await prisma.users.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_USER_BY_ID_FAILED}: ${error.message}`);
  }
};


const updateRefreshToken = async (query) => {
  try {
    return await prisma.users.update(query);
  } catch (error) {
    throw new Error(`DB UPDATE REFRESH TOKEN FAILED: ${error.message}`);
  }
};

module.exports = { create, findByEmail, findById, updateRefreshToken };
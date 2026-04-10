const prisma = require("../config/prismaClient");
const DB = require("../constants/errorMessages/db");

// inserts a new user row into the users table
const create = async (query) => {
  try {
    return await prisma.users.create(query);
  } catch (error) {
    throw new Error(`${DB.CREATE_USER_FAILED}: ${error.message}`);
  }
};

// finds one user by their email address
const findByEmail = async (query) => {
  try {
    return await prisma.users.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_USER_BY_EMAIL_FAILED}: ${error.message}`);
  }
};

// finds one user by their id
const findById = async (query) => {
  try {
    return await prisma.users.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_USER_BY_ID_FAILED}: ${error.message}`);
  }
};

module.exports = { create, findByEmail, findById };
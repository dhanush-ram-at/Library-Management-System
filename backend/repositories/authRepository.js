const authDAL = require("../DAL/authDAL");
const { formatUser } = require("../DTOs/authDTO");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

const createUser = async (data) => {
  try {
    const user = await authDAL.create({ data });
    return formatUser(user);
  } catch (error) {
    const err = new Error(`${REPO.CREATE_USER_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await authDAL.findByEmail({ where: { email } });
  } catch (error) {
    const err = new Error(`${REPO.FIND_USER_EMAIL_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const user = await authDAL.findById({ where: { id } });
    return user ? formatUser(user) : null;
  } catch (error) {
    const err = new Error(`${REPO.FIND_USER_ID_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

module.exports = { createUser, getUserByEmail, getUserById };




// const authDAL = require("../DAL/authDAL");
// const REPO = require("../constants/errorMessages/repo");
// const { formatUser } = require("../DTOs/authDTO");

// // CREATE USER
// const createUser = async (data) => {
//   try {
//     const user = await authDAL.create({ data });
//     return formatUser(user);  
//   } catch (error) {
//     const err = new Error(`${REPO.CREATE_USER_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// // GET USER BY EMAIL (RAW → for password check)
// const getUserByEmail = async (email) => {
//   try {
//     return await authDAL.findByEmail({ where: { email } });
//   } catch (error) {
//     const err = new Error(`${REPO.FIND_USER_EMAIL_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// // GET USER BY ID
// const getUserById = async (id) => {
//   try {
//     const user = await authDAL.findById({ where: { id } });
//     if (!user) return null;
//     return formatUser(user);   
//   } catch (error) {
//     const err = new Error(`${REPO.FIND_USER_ID_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// module.exports = { createUser, getUserByEmail, getUserById, };
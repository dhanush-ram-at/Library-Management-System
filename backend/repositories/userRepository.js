const prisma = require("../config/prismaClient");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

const getMembers = async (query) => {
  try {
    return await prisma.users.findMany(query);
  } catch (error) {
    const err = new Error(`${REPO.FETCH_USERS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

module.exports = { getMembers };
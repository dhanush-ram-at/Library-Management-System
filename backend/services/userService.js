const userRepo = require("../repositories/userRepository");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

const getMembers = async () => {
  try {
    const query = {
      where: { role: "MEMBER" },
      select: {
        id: true,
        name: true,
      },
    };

    const members = await userRepo.getMembers(query);

    return members;

  } catch (error) {
    const err = new Error(`${REPO.FETCH_USERS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

module.exports = { getMembers };
const userService = require("../services/userService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");

const getMembers = async (req, res, next) => {
  try {
    const members = await userService.getMembers();

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMembers };
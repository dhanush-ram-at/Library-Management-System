const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const ISSUE = require("../constants/errorMessages/issue");

// validates that the issue ID in the URL is a real number
const validateIssueId = (req, res, next) => {
  const id = parseInt(req.params.id);

  // parseInt returns NaN if the value is not a number
  if (isNaN(id)) {
    return res.status(STATUS.BAD_REQUEST).json({
      code:    STATUS.BAD_REQUEST,
      status:  STATUS_TEXT[STATUS.BAD_REQUEST],
      message: ISSUE.INVALID_ID,
    });
  }

  next();
};

module.exports = { validateIssueId };
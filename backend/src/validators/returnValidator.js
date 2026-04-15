const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const ISSUE = require("../constants/errorMessages/return");

/**
 * @function validateIssueId
 * @desc Validate issue ID from route parameters
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string|number} req.params.id - Issue ID
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if validation passes
 * @returns {Object} 400 - Validation error response (invalid ID)
 *
 * @throws {Error} If issue ID is not a valid number
 *
 * @author Dhanush
 * @date 2026-04-13
 */
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
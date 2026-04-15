const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const SERVER = require("../constants/errorMessages/server");
 
/**
 * @function errorHandler
 * @desc Global error handling middleware for catching and formatting errors
 * @access Internal (Middleware)
 *
 * @param {Object} err - Error object
 * @param {string} err.message - Error message
 * @param {number} [err.statusCode] - HTTP status code
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} JSON response with error details
 * @returns {number} returns.code - HTTP status code
 * @returns {string} returns.status - Status text
 * @returns {string} returns.message - Error message
 *
 * @sideEffect Logs error message to server console
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const errorHandler = (err, req, res, next) => {
 
  // print the error in terminal so developer can see it
  console.error("ERROR:", err.message);
 
  // use statusCode from error if set, otherwise 500
  const code    = err.statusCode || STATUS.SERVER_ERROR;
  const message = err.message    || SERVER.INTERNAL_ERROR;
 
  res.status(code).json({
    code,
    status:  STATUS_TEXT[code] || "error",
    message,
  });
 
};
 
module.exports = errorHandler;
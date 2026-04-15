const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
 
/**
 * @function notFound
 * @desc Handle requests to undefined routes (404 Not Found)
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {string} req.method - HTTP method (GET, POST, etc.)
 * @param {string} req.originalUrl - Requested URL
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 404 - Route not found response
 * @returns {number} returns.code - HTTP status code (404)
 * @returns {string} returns.status - Status text
 * @returns {string} returns.message - Error message with route info
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const notFound = (req, res, next) => {
  res.status(STATUS.NOT_FOUND).json({
    code:    STATUS.NOT_FOUND,
    status:  STATUS_TEXT[STATUS.NOT_FOUND],
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
 
module.exports = notFound;
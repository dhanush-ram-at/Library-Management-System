const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
 
/**
 * @function authorize
 * @desc Role-based access control middleware to restrict access based on user roles
 * @access Protected (Middleware)
 *
 * @param {...string} roles - Allowed roles (e.g., ADMIN, MEMBER)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user (set by protect middleware)
 * @param {string} req.user.role - User role
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if user is authorized
 * @returns {Object} 403 - Forbidden if user role is not allowed
 *
 * @modifies {None} Does not modify request, only validates access
 *
 * @throws {Error} If role validation fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const authorize = (...roles) => {
  return (req, res, next) => {
 
    // req.user was set by authMiddleware (protect)
    // check if the user's role is in the allowed roles list
    if (!roles.includes(req.user.role)) {
      return res.status(STATUS.FORBIDDEN).json({
        code:    STATUS.FORBIDDEN,
        status:  STATUS_TEXT[STATUS.FORBIDDEN],
        message: AUTH.FORBIDDEN,
      });
    }
 
    next();
  };
};
 
module.exports = authorize;
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
 
// accepts any number of allowed roles as arguments
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
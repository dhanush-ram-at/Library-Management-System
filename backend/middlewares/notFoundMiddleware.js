const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
 
const notFound = (req, res, next) => {
  res.status(STATUS.NOT_FOUND).json({
    code:    STATUS.NOT_FOUND,
    status:  STATUS_TEXT[STATUS.NOT_FOUND],
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
 
module.exports = notFound;
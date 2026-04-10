const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const SERVER = require("../constants/errorMessages/server");
 
// Global error handler — must be last middleware in app.js
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
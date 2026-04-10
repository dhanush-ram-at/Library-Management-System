const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/errorMessages/auth");
const { verifyToken } = require("../utils/token");
 
const protect = (req, res, next) => {
 
  // to check if Authorization header exists
  const header = req.headers.authorization;
 
  if (!header) {
    return res.status(STATUS.UNAUTHORIZED).json({
      code:    STATUS.UNAUTHORIZED,
      status:  STATUS_TEXT[STATUS.UNAUTHORIZED],
      message: AUTH.NO_TOKEN,
    });
  }
 
  // header format is: "Bearer eyJhbGci..."
  // split by space and take the second part (the actual token)
  const token = header.split(" ")[1];
 
  try {
    // verify the token using the secret key
    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    // attach the decoded user (id + role) to req so other middlewares can use it
    req.user = decoded;
    next();
    
  } catch {
    return res.status(STATUS.UNAUTHORIZED).json({
      code:    STATUS.UNAUTHORIZED,
      status:  STATUS_TEXT[STATUS.UNAUTHORIZED],
      message: AUTH.INVALID_TOKEN,
    });
  }
 
};
 
module.exports = protect;
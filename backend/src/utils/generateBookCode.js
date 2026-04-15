const APP_CONFIG = require("../constants/appConfig");

// generates a unique book code — BOOK + timestamp
const generateBookCode = () => {
  return APP_CONFIG.BOOK_CODE_PREFIX + Date.now();
};

module.exports = generateBookCode;
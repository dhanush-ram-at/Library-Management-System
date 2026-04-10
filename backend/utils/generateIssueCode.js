const APP_CONFIG = require("../constants/appConfig");
 
// Generates unique code like ISS1719000000000
const generateIssueCode = () => {
  return APP_CONFIG.ISSUE_CODE_PREFIX + Date.now();
};
 
module.exports = generateIssueCode;
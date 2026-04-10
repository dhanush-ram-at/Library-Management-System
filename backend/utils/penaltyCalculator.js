const APP_CONFIG = require("../constants/appConfig");
 
const calculatePenalty = (delayDays) => {
  // if no delay, penalty is 0
  if (delayDays <= 0) return 0;
 
  // multiply delay days by the penalty rate
  return delayDays * APP_CONFIG.PENALTY_PER_DAY;
};
 
module.exports = { calculatePenalty };
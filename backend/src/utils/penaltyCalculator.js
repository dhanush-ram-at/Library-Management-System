const APP_CONFIG = require("../constants/appConfig");
 
/**
 * @function calculatePenalty
 * @desc Calculate penalty amount based on delay days
 * @access Internal (Utility)
 *
 * @param {number} delayDays - Number of delayed days
 *
 * @returns {number} Penalty amount
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const calculatePenalty = (delayDays) => {
  // if no delay, penalty is 0
  if (delayDays <= 0) return 0;
 
  // multiply delay days by the penalty rate
  return delayDays * APP_CONFIG.PENALTY_PER_DAY;
};
 
module.exports = { calculatePenalty };
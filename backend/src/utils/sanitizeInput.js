//const AUTH = require("../constants/errorMessages/auth");
 
/**
 * @function sanitizeValue
 * @desc Clean a single input value by trimming and removing HTML tags
 * @access Internal (Utility)
 *
 * @param {any} value - Input value
 *
 * @returns {any} Sanitized value (string cleaned, others unchanged)
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const sanitizeValue = (value) => {
  // skip numbers and booleans — only clean strings
  if (typeof value !== "string") return value;
 
  let clean = value.trim();                  // remove spaces at start and end
  clean = clean.replace(/<[^>]*>/g, "");     // remove HTML tags like <script>, <b> etc.
  return clean;
};
 
/**
 * @function sanitizeBody
 * @desc Sanitize all fields in request body to prevent injection attacks
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() after sanitizing request body
 *
 * @modifies {Object} req.body - Cleans all string fields
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      req.body[key] = sanitizeValue(req.body[key]);
    }
  }
  next();
};
 
module.exports = sanitizeBody;
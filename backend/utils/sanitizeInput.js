//const AUTH = require("../constants/errorMessages/auth");
 
// cleans a single value
const sanitizeValue = (value) => {
  // skip numbers and booleans — only clean strings
  if (typeof value !== "string") return value;
 
  let clean = value.trim();                  // remove spaces at start and end
  clean = clean.replace(/<[^>]*>/g, "");     // remove HTML tags like <script>, <b> etc.
  return clean;
};
 
// loops over every field in req.body and cleans it
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      req.body[key] = sanitizeValue(req.body[key]);
    }
  }
  next();
};
 
module.exports = sanitizeBody;
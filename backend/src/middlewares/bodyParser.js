const express = require("express");
 
/**
 * @function jsonParser
 * @desc Parse incoming requests with JSON payload (application/json)
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Parsed JSON body
 *
 * @returns {void} Calls next() after parsing request body
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const jsonParser = express.json();


/**
 * @function urlencodedParser
 * @desc Parse incoming requests with URL-encoded payload (application/x-www-form-urlencoded)
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Parsed URL-encoded body
 *
 * @returns {void} Calls next() after parsing request body
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const urlencodedParser = express.urlencoded({ extended: true });
 
module.exports = { jsonParser, urlencodedParser };
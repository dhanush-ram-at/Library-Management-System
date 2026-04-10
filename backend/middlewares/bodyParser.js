const express = require("express");
 
// parses requests with Content-Type: application/json
const jsonParser = express.json();
 
// parses requests with Content-Type: application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: true });
 
module.exports = { jsonParser, urlencodedParser };
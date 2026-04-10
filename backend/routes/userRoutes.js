// Base URL: /api/v1/users
const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/roleMiddleware");

const userController = require("../controllers/userController");

// get all members (ADMIN ONLY)
router.get(
  "/members",
  protect,
  authorize("ADMIN"),
  userController.getMembers
);

module.exports = router;
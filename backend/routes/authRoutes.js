// Base URL: /api/v1/auth

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const sanitizeBody = require("../utils/sanitizeInput");
const { validateRegister, validateLogin, validateRefresh } = require("../validators/authValidator");

// POST /api/v1/auth/register
router.post(
  "/register",
  sanitizeBody,          // clean inputs first
  validateRegister,      // check required fields
  authController.register
);

// POST /api/v1/auth/login
router.post(
  "/login",
  sanitizeBody,
  validateLogin,
  authController.login
);

// POST /api/v1/auth/refresh
router.post(
  "/refresh",
  validateRefresh,
  authController.refresh
);

module.exports = router;
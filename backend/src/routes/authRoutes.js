// Base URL: /api/v1/auth

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const sanitizeBody = require("../../utils/sanitizeInput");
const { validateRegister, validateLogin, validateRefresh } = require("../../validators/authValidator");


/**
 * @route POST /api/v1/auth/register
 * @desc Register a new user
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.name - User name
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 201 - User registered successfully
 * @returns {Object} 400 - Validation error / User already exists
 *
 * @author Dhanush
 * @date 2026-04-13
 */
router.post(
  "/register",
  sanitizeBody,
  validateRegister,
  authController.register
);


/**
 * @route POST /api/v1/auth/login
 * @desc Authenticate user and return access & refresh tokens
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Login successful with tokens
 * @returns {Object} 400 - Invalid credentials
 *
 * @author Dhanush
 * @date 2026-04-13
 */
router.post(
  "/login",
  sanitizeBody,
  validateLogin,
  authController.login
);


/**
 * @route POST /api/v1/auth/refresh
 * @desc Generate new access token using refresh token
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string} req.body.refreshToken - Refresh token
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - New access token generated
 * @returns {Object} 401 - Invalid or expired refresh token
 *
 * @author Dhanush
 * @date 2026-04-13
 */
router.post(
  "/refresh",
  sanitizeBody,
  validateRefresh,
  authController.refresh
);


module.exports = router;
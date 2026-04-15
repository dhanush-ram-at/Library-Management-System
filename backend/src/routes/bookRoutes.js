// Base URL: /api/v1/books

const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const protect = require("../middlewares/authmiddleware");


/**
 * @route GET /api/v1/books
 * @desc Fetch all books or dropdown list based on query (?dropdown=true)
 * @access Admin, Member
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {boolean} [req.query.dropdown] - If true, returns minimal book list for dropdown
 *
 * @param {Object} req.user - Authenticated user
 * @param {string} req.user.role - User role (ADMIN / MEMBER)
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Books fetched successfully
 * @returns {Array} returns.data - List of books
 *
 * @author Dhanush
 * @date 2026-04-13
 */
router.get(
  "/",
  protect,
  bookController.getBooks
);

// router.get(
//   "/dropdown",
//   protect,
//   bookController.getBooks
// );
module.exports = router;
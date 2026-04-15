// Base URL: /api/v1/return

const express = require("express");
const router = express.Router();

const returnController = require("../controllers/returnController");

const protect = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/roleMiddleware");

//const sanitizeBody = require("../utils/sanitizeInput");

const { validateIssueId } = require("../../validators/returnValidator");
//const { validateLendBook } = require("../validators/bookValidator");


// /**
//  * @route POST /api/v1/return/lend
//  * @desc Issue (lend) a book to a user
//  * @access Admin
//  *
//  * @param {Object} req - Express request object
//  * @param {Object} req.body - Request payload
//  * @param {number} req.body.book_id - Book ID
//  * @param {number} req.body.user_id - User ID
//  *
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next middleware
//  *
//  * @returns {Object} 201 - Book issued successfully
//  * @returns {Object} 400 - Invalid input / No stock
//
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// router.post(
//   "/lend",
//   protect,
//   authorize("ADMIN"),
//   sanitizeBody,
//   validateLendBook,
//   returnController.lendBook
// );


/**
 * @route GET /api/v1/return
 * @desc Fetch all issues with pagination, search, filter, and sort
 * @access Admin, Member
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.page] - Page number
 * @param {string} [req.query.status] - Issue status filter
 * @param {string} [req.query.sort] - Sort field
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Issues fetched successfully with pagination
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
router.get(
  "/",
  protect,
  authorize("ADMIN", "MEMBER"),
  returnController.getAllIssues
);


/**
 * @route GET /api/v1/return/:id
 * @desc Fetch a single issue by ID
 * @access Admin
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.id - Issue ID
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Issue fetched successfully
 * @returns {Object} 400 - Invalid ID
 * @returns {Object} 404 - Issue not found
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
router.get(
  "/:id",
  protect,
  authorize("ADMIN"),
  validateIssueId,
  returnController.getIssueById
);


/**
 * @route PUT /api/v1/return/:id/returns
 * @desc Return a book and update issue details
 * @access Admin
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.id - Issue ID
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Book returned successfully
 * @returns {Object} 400 - Invalid ID / Already returned
 * @returns {Object} 403 - Unauthorized
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
router.put(
  "/:id/returns",
  protect,
  authorize("ADMIN"),
  validateIssueId,
  returnController.returnBook
);


/**
 * @route DELETE /api/v1/return/:id
 * @desc Soft delete an issue record
 * @access Admin only
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.id - Issue ID
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Issue deleted successfully
 * @returns {Object} 400 - Invalid ID
 * @returns {Object} 404 - Issue not found
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  validateIssueId,
  returnController.deleteIssue
);


module.exports = router;
// Base URL: /api/v1/issues

const express           = require("express");
const router            = express.Router();
const issueController   = require("../controllers/issueController");
const protect           = require("../middlewares/authmiddleware");
const authorize         = require("../middlewares/roleMiddleware");
const sanitizeBody         = require("../utils/sanitizeInput");
const { validateIssueId } = require("../validators/issueValidator");
const { validateLendBook } = require("../validators/bookValidator");

// POST /api/v1/issues/lend — ADMIN only
router.post(
  "/lend",
  protect,
  authorize("ADMIN"),
  sanitizeBody,
  validateLendBook,
  issueController.lendBook
);

// GET /api/v1/issues
// ADMIN → sees all issues
// MEMBER → sees only their own issues (filtered in service)
router.get(
  "/",
  protect,
  authorize("ADMIN", "MEMBER"),
  issueController.getIssues
);


// PUT /api/v1/issues/:id/return
// ADMIN → can return any book
// MEMBER → can return only their own book (checked in service)
router.put(
  "/:id/return",
  protect,
  authorize("ADMIN", "MEMBER"),
  validateIssueId,
  issueController.returnBook
);

// DELETE /api/v1/issues/:id — ADMIN only (soft delete)
router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  validateIssueId,
  issueController.deleteIssue
);

module.exports = router;
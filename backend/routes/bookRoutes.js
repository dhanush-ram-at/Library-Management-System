// Base URL: /api/v1/books

const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const protect = require("../middlewares/authmiddleware");


// GET /api/v1/books — both ADMIN and MEMBER can view books
router.get(
  "/",
  protect,
  bookController.getBooks
);

;
router.get(
  "/dropdown",
  protect,
  bookController.getBooksDropdown
);

module.exports = router;
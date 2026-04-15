const BOOK = require("../constants/errorMessages/book");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");

/**
 * @function validateLendBook
 * @desc Validate request body for lending a book (book_id, user_id)
 * @access Internal (Middleware)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request payload
 * @param {string|number} req.body.book_id - Book ID
 * @param {string|number} req.body.user_id - User ID
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {void} Calls next() if validation passes
 * @returns {Object} 400 - Validation error response
 *
 * @throws {Error} If book_id or user_id is missing or invalid
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const validateLendBook = (req, res, next) => {
  const { book_id, user_id } = req.body;  

  if (!book_id) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: BOOK.BOOK_REQUIRED
    });
  }

  if (Number.isNaN(parseInt(book_id))) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: BOOK.BOOK_ID_VALID_NUMBER,
    });
  }

  if (!user_id) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: BOOK.SELECT_MEMBER,  
    });
  }

  if (isNaN(parseInt(user_id))) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: BOOK.USER_ID_MUST_BE_VALID,
    });
  }

  next();
};

module.exports = { validateLendBook };
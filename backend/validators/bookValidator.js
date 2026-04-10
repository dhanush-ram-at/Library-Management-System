const BOOK = require("../constants/errorMessages/book");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");

const validateLendBook = (req, res, next) => {
  const { book_id, user_id } = req.body;  

  if (!book_id) {
    return res.status(STATUS.BAD_REQUEST).json({
      code: STATUS.BAD_REQUEST,
      status: STATUS_TEXT[STATUS.BAD_REQUEST],
      message: BOOK.BOOK_REQUIRED
    });
  }

  if (isNaN(parseInt(book_id))) {
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
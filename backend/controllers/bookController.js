const bookService = require("../services/bookService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const BOOK = require("../constants/errorMessages/book");

// GET /api/v1/books
const getBooks = async (req, res, next) => {
  try {
    const query = {
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      sort: req.query.sort,
    };

    const result = await bookService.getBooks(query);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: BOOK.FETCH_OK,
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/books/dropdown
const getBooksDropdown = async (req, res, next) => {
  try {
    const books = await bookService.getBooksForDropdown();

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: BOOK.FETCH_OK,
      data: books,
      pagination: {
        page: 1,
        limit: books.length,
        total: books.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBooks, getBooksDropdown };
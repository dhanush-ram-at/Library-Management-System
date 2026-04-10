const bookRepo = require("../repositories/bookRepository");
const APP_CONFIG = require("../constants/appConfig");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

const getBooks = async (query) => {
  try {
    const page = parseInt(query.page) || 1;
    const limit = APP_CONFIG.PAGINATION.LIMIT;
    const skip = (page - 1) * limit;

    const where = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { author_name: { contains: query.search } },
      ];
    }

    if (query.status) {
      where.status = query.status;
    }

    const data = await bookRepo.findBooks({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    const total = await bookRepo.countBooks({ where });

    return { page, limit, total, data };

  } catch (error) {
    const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const getBooksForDropdown = async () => {
  try {
    return await bookRepo.findBooksDropdown();
  } catch (error) {
    const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

module.exports = { getBooks, getBooksForDropdown };





// const bookRepo   = require("../repositories/bookRepository");
// const APP_CONFIG = require("../constants/appConfig");
// const REPO = require("../constants/errorMessages/repo");
// const BOOK = require("../constants/errorMessages/book");
// const { STATUS } = require("../constants/statusCodes");

// // GET ALL
// const getBooks = async (query) => {
//   try {
//     const page  = parseInt(query.page) || APP_CONFIG.PAGINATION.DEFAULT_PAGE;
//     const limit = APP_CONFIG.PAGINATION.LIMIT;
//     const skip  = (page - 1) * limit;
//     const sortField = query.sort || APP_CONFIG.SORT.DEFAULT_FIELD;
//     const sortOrder = APP_CONFIG.SORT.DEFAULT_DIRECTION;

//     const filters = {};

//     if (query.search) {
//       filters.OR = [
//         { title:       { contains: query.search } },
//         { author_name: { contains: query.search } },
//       ];
//     }

//     if (query.status) {
//       filters.status = query.status;
//     }

//     const books = await bookRepo.findAllBooks(
//       filters,
//       skip,
//       limit,
//       sortField,
//       sortOrder
//     );

//     const total = await bookRepo.countBooks(filters);

//     return { page, limit, total, data: books };

//   } catch (error) {
//     throw new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
//   }
// };

// // DROPDOWN
// const getBooksForDropdown = async () => {
//   try {
//     return await bookRepo.findAllBooksForDropdown();
//   } catch (error) {
//     throw new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
//   }
// };

// module.exports = { getBooks, getBooksForDropdown };
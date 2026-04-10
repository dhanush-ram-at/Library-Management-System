const bookDAL = require("../DAL/bookDAL");
const { formatBook, formatBookList } = require("../DTOs/bookDTO");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

const findBooks = async (query) => {
  try {
    const rows = await bookDAL.findMany(query);
    return formatBookList(rows);
  } catch (error) {
    const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const countBooks = async (query) => {
  try {
    return await bookDAL.count(query);
  } catch (error) {
    const err = new Error(`${REPO.COUNT_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const findBookById = async (id) => {
  try {
    const book = await bookDAL.findUnique({ where: { id } });
    return book ? formatBook(book) : null;
  } catch (error) {
    const err = new Error(`${REPO.FIND_BOOK_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

const findBooksDropdown = async () => {
  try {
    const rows = await bookDAL.findMany({
      where: { status: "Active" },
      orderBy: { title: "asc" },
    });

    return rows.map(b => ({ id: b.id, title: b.title }));
  } catch (error) {
    const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

module.exports = { findBooks, countBooks, findBookById, findBooksDropdown };





// const bookDAL = require("../DAL/bookDAL");
// const APP_CONFIG = require("../constants/appConfig");
// const REPO = require("../constants/errorMessages/repo");
// const { formatBook, formatBookList } = require("../DTOs/bookDTO");

// // GET ALL BOOKS
// const findAllBooks = async (filters, skip, limit, sortField, sortOrder) => {
//   try {
//     const query = {
//       where: filters,
//       skip,
//       take: limit,
//       orderBy: {
//         [sortField || APP_CONFIG.SORT.DEFAULT_FIELD]:
//           sortOrder || APP_CONFIG.SORT.DEFAULT_DIRECTION,
//       },
//     };

//     const rows = await bookDAL.findMany(query);
//     return formatBookList(rows);  
//   } catch (error) {
//     const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// // COUNT BOOKS
// const countBooks = async (filters) => {
//   try {
//     return await bookDAL.count({ where: filters });
//   } catch (error) {
//     const err = new Error(`${REPO.COUNT_BOOKS_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// // FIND BOOK BY ID
// const findBookById = async (id) => {
//   try {
//     const raw = await bookDAL.findUnique({ where: { id } });
//     if (!raw) return null;
//     return formatBook(raw);
//   } catch (error) {
//     const err = new Error(`${REPO.FIND_BOOK_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// // DROPDOWN BOOK LIST
// const findAllBooksForDropdown = async () => {
//   try {
//     const rows = await bookDAL.findMany({
//       where: { status: "Active" },
//       orderBy: { title: "asc" },
//     });

//     return rows.map((b) => ({
//       id: b.id,
//       title: b.title,
//     }));  
//   } catch (error) {
//     const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };

// module.exports = { findAllBooks, countBooks, findBookById, findAllBooksForDropdown, };
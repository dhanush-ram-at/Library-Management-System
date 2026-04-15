const bookDAL = require("../DAL/bookDAL");
const { formatBook, formatBookList } = require("../DTOs/bookDTO");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");
 
/**
 * @function getBooks
 * @desc Fetch books from DAL and apply response DTO
 * @access Internal (Repository)
 *
 * @param {Object} query - Prisma query object
 *
 * @returns {Promise<Array>} List of books
 * @returns {number} returns[].id - Book ID
 * @returns {string} returns[].title - Book title
 * @returns {string} returns[].author_name - Author name
 * @returns {string} returns[].status - Book status
 *
 * @throws {Error} Throws error if fetching books fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getBooks = async (query) => {
  try {
    const rows = await bookDAL.getBooks(query);
    return formatBookList(rows);              // <-- response DTO
  } catch (error) {
    const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};
 
/**
 * @function countBooks
 * @desc Count total number of books from DAL
 * @access Internal (Repository)
 *
 * @param {Object} query - Prisma query object
 *
 * @returns {Promise<number>} Total number of books
 *
 * @throws {Error} Throws error if counting books fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const countBooks = async (query) => {
  try {
    return await bookDAL.countBooks(query);
  } catch (error) {
    const err = new Error(`${REPO.COUNT_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};
 
// // /**
// //  * @function findBookById
// //  * @desc Fetch a single book by ID and apply response DTO
// //  * @access Internal (Repository)
// //  *
// //  * @param {number} id - Book ID
// //  *
// //  * @returns {Promise<Object|null>} Book object if found, otherwise null
// //  * @returns {number} returns.id - Book ID
// //  * @returns {string} returns.title - Book title
// //  * @returns {string} returns.author_name - Author name
// //  *
// //  * @throws {Error} Throws error if fetching book fails
// //  *
// //  * @author Dhanush
// //  * @date 2026-04-13
// //  */
// // const findBookById = async (id) => {
// //   try {
// //     const book = await bookDAL.findUnique({ where: { id } });
// //     return book ? formatBook(book) : null;    // <-- response DTO
// //   } catch (error) {
// //     const err = new Error(`${REPO.FIND_BOOK_FAILED}: ${error.message}`);
// //     err.statusCode = STATUS.SERVER_ERROR;
// //     throw err;
// //   }
// // };
 
// /**
//  * @function getBooksDropdown
//  * @desc Fetch active books for dropdown (id and title only)
//  * @access Internal (Repository)
//  *
//  * @returns {Promise<Array>} List of books
//  * @returns {number} returns[].id - Book ID
//  * @returns {string} returns[].title - Book title
//  *
//  * @throws {Error} Throws error if fetching dropdown books fails
//  *
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const getBooksDropdown = async () => {
//   try {
//     const rows = await bookDAL.getBooksDropdown({
//       where:   { status: "Active" },
//       orderBy: { title: "asc" },
//     });
//     return rows.map((b) => ({ id: b.id, title: b.title }));
//   } catch (error) {
//     const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.SERVER_ERROR;
//     throw err;
//   }
// };
 
//module.exports = { findBooks, countBooks, findBookById, findBooksDropdown };
//module.exports = { getBooks, countBooks, getBooksDropdown };
module.exports = { getBooks, countBooks };
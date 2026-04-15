const prisma = require("../config/prismaClient");
const DB = require("../constants/errorMessages/db");
//const { countBooks } = require("../repositories/bookRepository");
 
/**
 * @function getBooks
 * @desc Fetch books from database with filters, pagination, and sorting
 * @access Internal (DAL)
 *
 * @param {Object} query - Prisma query object
 *
 * @returns {Promise<Array<Object>>} List of books
 * @returns {number} returns[].id - Book ID
 * @returns {string} returns[].title - Book title
 * @returns {string} returns[].author_name - Author name
 * @returns {string} returns[].status - Book status
 *
 * @throws {Error} Throws error if database query fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getBooks = async (query) => {
  try {
    return await prisma.books.findMany(query);
  } catch (error) {
    throw new Error(`${DB.FIND_BOOKS_FAILED}: ${error.message}`);
  }
};
 

/**
 * @function countBooks
 * @desc Count total number of books from database
 * @access Internal (DAL)
 *
 * @param {Object} query - Prisma query object
 *
 * @returns {Promise<number>} Total number of books
 *
 * @throws {Error} Throws error if database query fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const countBooks = async (query) => {
  try {
    return await prisma.books.count(query);
  } catch (error) {
    throw new Error(`${DB.COUNT_BOOKS_FAILED}: ${error.message}`);
  }
};



// const getBooksDropdown = async () => {
//   try {
//     return await prisma.books.findMany({
//       where: { status: "Active" },
//       select: { id: true, title: true },
//       orderBy: { title: "asc" },
//     });
//   } catch (error) {
//     throw new Error(`${DB.FIND_BOOKS_FAILED}: ${error.message}`);
//   }
// };

 
// /**
//  * @function findUnique
//  * @desc Fetch a single book by ID from database
//  * @access Internal (DAL)
//  *
//  * @param {Object} query - Prisma query object
//  * @param {Object} query.where - Where condition
//  * @param {number} query.where.id - Book ID
//  *
//  * @returns {Promise<Object|null>} Book object if found, otherwise null
//  *
//  * @throws {Error} Throws error if database query fails
//  *
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const findUnique = async (query) => {
//   try {
//     return await prisma.books.findUnique(query);
//   } catch (error) {
//     throw new Error(`${DB.FIND_BOOK_BY_ID_FAILED}: ${error.message}`);
//   }
// };
 

// /**
//  * @function update
//  * @desc Update a book record in the database
//  * @access Internal (DAL)
//  *
//  * @param {Object} query - Prisma query object
//  * @param {Object} query.where - Condition to identify the book
//  * @param {number} query.where.id - Book ID
//  * @param {Object} query.data - Fields to update
//  *
//  * @returns {Promise<Object>} Updated book object
//  * @returns {number} returns.id - Book ID
//  * @returns {string} returns.title - Book title
//  * @returns {string} returns.author_name - Author name
//  * @returns {string} returns.status - Book status
//  *
//  * @throws {Error} Throws error if update operation fails
//  *
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const update = async (query) => {
//   try {
//     return await prisma.books.update(query);
//   } catch (error) {
//     throw new Error(`${DB.UPDATE_BOOK_FAILED}: ${error.message}`);
//   }
// };
 
// module.exports = { findMany, count, findUnique, update };
//module.exports = { getBooks, countBooks, getBooksDropdown };
module.exports = { getBooks, countBooks };
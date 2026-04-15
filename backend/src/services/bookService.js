const bookRepo   = require("../repositories/bookRepository");
const APP_CONFIG = require("../constants/appConfig");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

/**
 * @function getBooks
 * @desc Fetch books with pagination, search, and filter
 * @access Internal (Service)
 *
 * @param {Object} dto - Data transfer object
 * @param {string|number} [dto.page] - Page number
 * @param {string} [dto.search] - Search keyword (title or author)
 * @param {string} [dto.status] - Book status filter
 *
 * @returns {Promise<Object>} Paginated books response
 * @returns {number} returns.page - Current page
 * @returns {number} returns.limit - Number of records per page
 * @returns {number} returns.total - Total number of books
 * @returns {Array<Object>} returns.data - List of books
 *
 * @throws {Error} Throws error if fetching books fails
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getBooks = async (dto) => {
  try {
    const page  = parseInt(dto.page) || APP_CONFIG.PAGINATION.DEFAULT_PAGE;
    const limit = APP_CONFIG.PAGINATION.LIMIT;
    const skip  = (page - 1) * limit;

    const where = {};

    // search by title or author
    if (dto.search) {
      where.OR = [
        { title: { contains: dto.search, }},
        { author_name: { contains: dto.search, }}
      ];
    }

    // filter by status
    if (dto.status) {
      where.status = dto.status;
    }

    const orderBy =
      dto.sort === "oldest"
        ? { created_at: "asc" }
        : { created_at: "desc" };
      
    const data  = await bookRepo.getBooks({
      where,
      skip,
      take: limit,
      orderBy,//: { created_at: "desc" },
    });

    const total = await bookRepo.countBooks({ where });

    return { page, limit, total, data };

  } catch (error) {
    const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


// /**
//  * @function getBooksForDropdown
//  * @desc Fetch active books for dropdown (id and title only)
//  * @access Internal (Service)
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
// const getBooksForDropdown = async () => {
//   try {
//     return await bookRepo.findBooksDropdown();
//   } catch (error) {
//     const err = new Error(`${REPO.FETCH_BOOKS_FAILED}: ${error.message}`);
//     err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
//     throw err;
//   }
// };

//module.exports = { getBooks, getBooksForDropdown };
module.exports = { getBooks };
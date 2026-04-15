const { getBooksRequestDto } = require("../DTOs/bookDTO");
const bookService = require("../services/bookService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const BOOK = require("../constants/errorMessages/book");

/**
 * @route GET /api/v1/books
 * @desc Fetch all books or dropdown list based on query (?dropdown=true)
 * @access Admin, Member
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {boolean} [req.query.dropdown] - If true, returns minimal book list for dropdown
 *
 * @param {Object} req.user - Authenticated user
 * @param {string} req.user.role - User role (ADMIN / MEMBER)
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Books fetched successfully
 * @returns {Array} returns.data - List of books
 * @returns {Object} returns.pagination - Pagination details
 * @returns {number} returns.pagination.page - Current page
 * @returns {number} returns.pagination.limit - Number of records per page
 * @returns {number} returns.pagination.total - Total records count
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getBooks = async (req, res, next) => {
  try {
    // 1. Extract Request DTO
    const dto = getBooksRequestDto(req);

    // 2. Fetch Data
    const result = dto.isDropdown 
      ? { data: await bookService.getBooksForDropdown() } 
      : await bookService.getBooks(dto);

    // 3. Format & Return
    return res.status(STATUS.OK).json({
      code:    STATUS.OK,
      status:  STATUS_TEXT[STATUS.OK],
      message: BOOK.FETCH_OK,
      data:    result.data,
      pagination: dto.isDropdown ? undefined : {
        page: result.page,
        limit: result.limit,
        total: result.total,
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBooks };
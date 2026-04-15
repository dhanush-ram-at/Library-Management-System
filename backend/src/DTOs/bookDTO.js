// response DTO — what we send back to frontend for one book
/**
 * @function formatBook
 * @desc Transform book DB object into API response format
 * @access Internal (DTO)
 *
 * @param {Object} book - Book DB object
 *
 * @returns {Object} Formatted book response
 * @returns {number} returns.id - Book ID
 * @returns {string} returns.book_code - Book code
 * @returns {string} returns.title - Book title
 * @returns {string} returns.author_name - Author name
 * @returns {number} returns.total_copies - Total copies
 * @returns {number} returns.available_copies - Available copies
 * @returns {string} returns.status - Book status
 * @returns {string} returns.created_at - Created timestamp
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const formatBook = (book) => ({
  id:               book.id,
  book_code:        book.book_code,
  title:            book.title,
  author_name:      book.author_name,
  total_copies:     book.total_copies,
  available_copies: book.available_copies,
  status:           book.status,
  created_at:       book.created_at,
});

/**
 * @function formatBookList
 * @desc Transform array of book records into response format
 * @access Internal (DTO)
 *
 * @param {Array<Object>} books - Array of book DB objects
 *
 * @returns {Array<Object>} Formatted book list
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const formatBookList = (books) => books.map(formatBook);


/**
 * @function getBooksRequestDto
 * @desc Transform request query into books DTO format
 * @access Internal (DTO)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string|number} [req.query.page] - Page number
 * @param {string} [req.query.search] - Search keyword
 * @param {string} [req.query.status] - Book status filter
 * @param {string} [req.query.sort] - Sort option
 * @param {string} [req.query.dropdown] - Dropdown flag ('true' or 'false')
 *
 * @returns {Object} Formatted DTO
 * @returns {number|string} returns.page - Page number
 * @returns {string} returns.search - Search keyword
 * @returns {string|null} returns.status - Book status filter
 * @returns {string} returns.sort - Sort option
 * @returns {boolean} returns.isDropdown - Dropdown flag
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getBooksRequestDto = (req) => ({
  page:       Number(req.query.page) || 1,
  search:     req.query.search || "",
  status:     req.query.status || null,
  sort:       req.query.sort || "latest",
  isDropdown: req.query.dropdown === 'true',
});


module.exports = { getBooksRequestDto, formatBook, formatBookList };
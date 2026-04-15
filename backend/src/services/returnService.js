const returnRepo = require("../repositories/returnRepository");
//const bookRepo  = require("../repositories/bookRepository");

const APP_CONFIG = require("../constants/appConfig");
const ISSUE = require("../constants/errorMessages/return");
//const BOOK  = require("../constants/errorMessages/book");
const { STATUS } = require("../constants/statusCodes");

//const generateIssueCode     = require("../utils/generateIssueCode");
const { getDaysDifference } = require("../../utils/dateUtils");
const { calculatePenalty }  = require("../../utils/penaltyCalculator");


/**
 * @route GET /api/v1/return
 * @desc Fetch all issues with pagination, search, filter, and sort
 * @access Admin, Member
 *
 * @param {Object} dto - Request DTO
 * @param {number} dto.page - Page number
 * @param {string} dto.status - Issue status filter
 * @param {string} dto.sort - Sort field
 *
 * @param {Object} user - Authenticated user
 * @param {string} user.role - User role (ADMIN / MEMBER)
 *
 * @returns {Object} Paginated issue data
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const getAllIssues = async (dto, user) => {
  try {
    const page   = parseInt(dto.page) || APP_CONFIG.PAGINATION.DEFAULT_PAGE;
    const limit  = APP_CONFIG.PAGINATION.LIMIT;
    const skip   = (page - 1) * limit;
    const sortBy = dto.sort || APP_CONFIG.SORT.DEFAULT_FIELD;
    const order  = APP_CONFIG.SORT.DEFAULT_DIRECTION;

    const filters = {};

    if (dto.status) filters.issue_status = dto.status;
    if (dto.search) filters.search = dto.search;
    if (dto.filter) filters.filter = dto.filter;

    const { issues, total } = await returnRepo.getIssues(
      skip,
      limit,
      sortBy,
      order,
      filters,
      user
    );

    return {
      page,
      limit,
      total,
      data: issues,
    };

  } catch (error) {
    const err = new Error(`${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @route GET /api/v1/return/:id
 * @desc Fetch a single issue by ID with RBAC validation
 * @access Admin
 *
 * @param {number} issueId - Issue ID
 * @param {Object} user - Authenticated user
 * @param {string} user.role - User role
 *
 * @returns {Object} Issue details
 * @throws {Error} Issue not found / Unauthorized
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const getIssueById = async (issueId, user) => {
  try {
    const issue = await returnRepo.findUnique(issueId);

    if (!issue) {
      const error = new Error(ISSUE.NOT_FOUND);
      error.statusCode = STATUS.NOT_FOUND;
      throw error;
    }

    return issue;

  } catch (error) {
    const err = new Error(`${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @route PUT /api/v1/return/:id/returns
 * @desc Return a book and update issue details
 * @access Admin only
 *
 * @param {number} issueId - Issue ID
 * @param {Object} user - Authenticated user
 *
 * @returns {Object} Updated issue record
 * @throws {Error} Issue not found / Already returned / Unauthorized
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const update = async (issueId, user) => {
  try {
    const issue = await returnRepo.findUnique(issueId);

    if (!issue) {
      const error = new Error(ISSUE.NOT_FOUND);
      error.statusCode = STATUS.NOT_FOUND;
      throw error;
    }

    if (issue.issue_status === "RETURNED") {
      const error = new Error(ISSUE.ALREADY_RETURNED);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const returnDate = new Date();
    const delayDays  = getDaysDifference(issue.due_date, returnDate);
    const delayStatus = delayDays > 0 ? "DELAYED" : "ON_TIME";
    const penalty = calculatePenalty(delayDays);

    const updated = await returnRepo.update(issueId, {
      return_date:  returnDate,
      issue_status: "RETURNED",
      delay_days:   delayDays,
      delay_status: delayStatus,
      penalty,
    });

    await returnRepo.updateStock(issue.book_id, 1);

    return updated;

  } catch (error) {
    const err = new Error(`${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @route DELETE /api/v1/return/:id
 * @desc Soft delete an issue record
 * @access Admin only
 *
 * @param {number} issueId - Issue ID
 * @param {Object} user - Authenticated user
 *
 * @returns {void}
 * @throws {Error} Issue not found
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const deleteIssue = async (issueId, user) => {
  try {
    const issue = await returnRepo.findUnique(issueId);

    if (!issue) {
      const error = new Error(ISSUE.NOT_FOUND);
      error.statusCode = STATUS.NOT_FOUND;
      throw error;
    }

    await returnRepo.deleteIssue(issueId);

  } catch (error) {
    const err = new Error(`${error.message}`);
    err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
    throw err;
  }
};


// /**
//  * @route POST /api/v1/return/lend
//  * @desc Issue (lend) a book to a user
//  * @access Admin only
//  *
//  * @param {Object} dto - Request DTO
//  * @param {number} dto.book_id - Book ID
//  * @param {number} dto.user_id - User ID
//  *
//  * @param {Object} user - Authenticated user
//  *
//  * @returns {Object} Created issue record
//  * @throws {Error} Book not found / No stock

//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const lendBook = async (dto, user) => {
//   try {
//     const bookId = parseInt(dto.book_id);
//     const userId = parseInt(dto.user_id);

//     const book = await bookRepo.findBookById(bookId);

//     if (!book) {
//       const error = new Error(BOOK.NOT_FOUND);
//       error.statusCode = STATUS.NOT_FOUND;
//       throw error;
//     }

//     if (book.available_copies <= 0) {
//       const error = new Error(BOOK.NO_STOCK);
//       error.statusCode = STATUS.BAD_REQUEST;
//       throw error;
//     }

//     const issueDate = new Date();
//     const dueDate   = new Date();
//     dueDate.setDate(dueDate.getDate() + APP_CONFIG.LOAN_DAYS);

//     const issue = await issueRepo.createIssue({
//       issue_code:   generateIssueCode(),
//       book_id:      bookId,
//       user_id:      userId,
//       issue_date:   issueDate,
//       due_date:     dueDate,
//       issue_status: "ISSUED",
//     });

//     // decrement stock
//     await returnRepo.updateStock(bookId, -1);

//     return issue;

//   } catch (error) {
//     const err = new Error(`${error.message}`);
//     err.statusCode = error.statusCode || STATUS.SERVER_ERROR;
//     throw err;
//   }
// };


module.exports = {
  getAllIssues,
  getIssueById,
  update,
  deleteIssue,
  //lendBook,
};
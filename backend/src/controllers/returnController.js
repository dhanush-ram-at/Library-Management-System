const returnService = require("../services/returnService");

const { toGetIssuesQuery, toIssueIdInput } = require("../DTOs/returnDTO");
//const { toGetIssuesQuery, toIssueIdInput, toLendBookInput, } = require("../DTOs/returnDTO");

const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const ISSUE = require("../constants/errorMessages/return");


/**
 * @route GET /api/v1/return
 * @desc Fetch all issues with pagination, search, filter, and sort
 * @access Admin, Member
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.page] - Page number
 * @param {string} [req.query.status] - Issue status filter
 * @param {string} [req.query.sort] - Sort field
 *
 * @param {Object} req.user - Authenticated user
 * @param {string} req.user.role - User role (ADMIN / MEMBER)
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Success response with issues list and pagination
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const getAllIssues = async (req, res, next) => {
  try {
    // DTO transformation (query params → structured object)
    const dto = toGetIssuesQuery(req.query);

    const result = await returnService.getAllIssues(dto, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.FETCH_OK,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
      },
    });

  } catch (error) {
    next(error);
  }
};


/**
 * @route GET /api/v1/return/:id
 * @desc Fetch a single issue by ID
 * @access Admin, Member (own record only)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.id - Issue ID
 *
 * @param {Object} req.user - Authenticated user
 * @param {string} req.user.role - User role
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Success response with issue details
 * @returns {Object} 400 - Invalid ID
 * @returns {Object} 404 - Issue not found
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const getIssueById = async (req, res, next) => {
  try {
    // DTO transformation
    const { issueId } = toIssueIdInput(req.params);

    const issue = await returnService.getIssueById(issueId, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.FETCH_OK,
      data: issue,
    });

  } catch (error) {
    next(error);
  }
};


/**
 * @route PUT /api/v1/return/:id/return
 * @desc Return a book and update issue details
 * @access Admin only (Member restricted in service)
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.id - Issue ID
 *
 * @param {Object} req.user - Authenticated user
 * @param {string} req.user.role - User role
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Book returned successfully
 * @returns {Object} 400 - Invalid ID / Already returned
 * @returns {Object} 403 - Unauthorized
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const returnBook = async (req, res, next) => {
  try {
    const { issueId } = toIssueIdInput(req.params);

    // service handles full business logic
    const updated = await returnService.update(issueId, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.RETURNED,
      data: updated,
    });

  } catch (error) {
    next(error);
  }
};


/**
 * @route DELETE /api/v1/return/:id
 * @desc Soft delete an issue record
 * @access Admin only
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number} req.params.id - Issue ID
 *
 * @param {Object} req.user - Authenticated user
 * @param {string} req.user.role - User role
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 *
 * @returns {Object} 200 - Issue deleted successfully
 * @returns {Object} 400 - Invalid ID
 * @returns {Object} 404 - Issue not found
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const deleteIssue = async (req, res, next) => {
  try {
    const { issueId } = toIssueIdInput(req.params);

    await returnService.deleteIssue(issueId, req.user);

    return res.status(STATUS.OK).json({
      code: STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: ISSUE.DELETED,
    });

  } catch (error) {
    next(error);
  }
};


// /**
//  * @route POST /api/v1/return/lend
//  * @desc Issue (lend) a book to a user
//  * @access Admin only
//  *
//  * @param {Object} req - Express request object
//  * @param {Object} req.body - Request payload
//  * @param {number} req.body.book_id - Book ID
//  * @param {number} req.body.user_id - User ID
//  *
//  * @param {Object} req.user - Authenticated user
//  * @param {string} req.user.role - User role
//  *
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next middleware
//  *
//  * @returns {Object} 201 - Book issued successfully
//  * @returns {Object} 400 - Invalid input / No stock
//  * @returns {Object} 404 - Book not found
//  *
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const lendBook = async (req, res, next) => {
//   try {
//     const dto = toLendBookInput(req.body);

//     const issue = await returnService.lendBook(dto, req.user);

//     return res.status(STATUS.CREATED).json({
//       code: STATUS.CREATED,
//       status: STATUS_TEXT[STATUS.CREATED],
//       message: ISSUE.CREATED,
//       data: issue,
//     });

//   } catch (error) {
//     next(error);
//   }
// };


module.exports = {
  getAllIssues,
  getIssueById,
  returnBook,
  deleteIssue,
  //lendBook,
};
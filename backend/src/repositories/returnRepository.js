const returnDAL = require("../DAL/returnDAL");
const { formatIssue, formatIssueList } = require("../DTOs/returnDTO");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");


/**
 * @route INTERNAL - Repository Layer
 * @desc Fetch all issues and apply response DTO
 * @access Internal
 *
 * @param {number} skip - Pagination skip value
 * @param {number} limit - Number of records
 * @param {string} sortBy - Sort field
 * @param {string} order - Sort order (asc/desc)
 * @param {Object} filters - Filter conditions
 * @param {Object} user - Authenticated user
 *
 * @returns {Object} Issues list with total count
 * @author Dhanush
 * @date 2026-04-13
 */
const getIssues = async (skip, limit, sortBy, order, filters, user) => {
  try {
    const { issues, total } = await returnDAL.getIssues(
      skip,
      limit,
      sortBy,
      order,
      filters,
      user
    );

    return {
      issues: formatIssueList(issues), // DTO applied
      total,
    };

  } catch (error) {
    const err = new Error(`${REPO.FETCH_ISSUES_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};


/**
 * @route INTERNAL - Repository Layer
 * @desc Fetch single issue record (raw data)
 * @access Internal
 *
 * @param {number} issueId - Issue ID
 *
 * @returns {Object|null} Raw issue data
 * @author Dhanush
 * @date 2026-04-13
 */
const findUnique = async (issueId) => {
  try {
    const issue = await returnDAL.findUniqueIssue(issueId);
    return issue ? formatIssue(issue) : null;

  } catch (error) {
    const err = new Error(`${REPO.FIND_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.NOT_FOUND;
    throw err;
  }
};


/**
 * @route INTERNAL - Repository Layer
 * @desc Update issue record and apply response DTO
 * @access Internal
 *
 * @param {number} issueId - Issue ID
 * @param {Object} data - Update payload
 *
 * @returns {Object} Updated issue record
 * @author Dhanush
 * @date 2026-04-13
 */
const update = async (issueId, data) => {
  try {
    const raw = await returnDAL.updateIssue(issueId, data);

    return formatIssue(raw); // DTO applied

  } catch (error) {
    const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};


/**
 * @route INTERNAL - Repository Layer
 * @desc Update book stock (increment or decrement)
 * @access Internal
 *
 * @param {number} bookId - Book ID
 * @param {number} increment - +1 or -1
 *
 * @returns {Object} Updated book record
 * @author Dhanush
 * @date 2026-04-13
 */
const updateStock = async (bookId, increment) => {
  try {
    return await returnDAL.updateBookStock(bookId, increment);

  } catch (error) {
    const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};


/**
 * @route INTERNAL - Repository Layer
 * @desc Soft delete issue record (is_deleted = true)
 * @access Internal
 *
 * @param {number} issueId - Issue ID
 *
 * @returns {Object} Updated issue record
 * @author Dhanush
 * @date 2026-04-13
 */
const deleteIssue = async (issueId) => {
  try {
    return await returnDAL.softDeleteIssue(issueId);

  } catch (error) {
    const err = new Error(`${REPO.DELETE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.SERVER_ERROR;
    throw err;
  }
};


// /**
//  * @route INTERNAL - Repository Layer
//  * @desc Create new issue record and apply response DTO
//  * @access Internal
//  *
//  * @param {Object} data - Issue data
//  *
//  * @returns {Object} Created issue record
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const createIssue = async (data) => {
//   try {
//     const raw = await returnDAL.createIssue(data);

//     return formatIssue(raw); // DTO applied

//   } catch (error) {
//     const err = new Error(`${REPO.CREATE_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };


module.exports = {
  getIssues,
  findUnique,
  update,
  updateStock,
  deleteIssue,
  //createIssue,
};
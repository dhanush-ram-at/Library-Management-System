const issueDAL = require("../DAL/issueDAL");
const { formatIssue, formatIssueList } = require("../DTOs/issueDTO");
const { STATUS } = require("../constants/statusCodes");
const REPO = require("../constants/errorMessages/repo");

// CREATE
const createIssue = async (query) => {
  try {
    const raw = await issueDAL.create(query);
    return formatIssue(raw);
  } catch (error) {
    const err = new Error(`${REPO.CREATE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};

// FIND MANY
const findIssues = async (query) => {
  try {
    const rows = await issueDAL.findMany(query);
    return formatIssueList(rows);
  } catch (error) {
    const err = new Error(`${REPO.FETCH_ISSUES_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

// COUNT
const countIssues = async (query) => {
  try {
    return await issueDAL.count(query);
  } catch (error) {
    const err = new Error(`${REPO.COUNT_ISSUES_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

// FIND RAW
const findIssueRaw = async (query) => {
  try {
    return await issueDAL.findUnique(query);
  } catch (error) {
    const err = new Error(`${REPO.FIND_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.NOT_FOUND;
    throw err;
  }
};

// UPDATE
const updateIssue = async (query) => {
  try {
    const raw = await issueDAL.update(query);
    return formatIssue(raw);
  } catch (error) {
    const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};

// DELETE
const softDelete = async (query) => {
  try {
    return await issueDAL.update(query);
  } catch (error) {
    const err = new Error(`${REPO.DELETE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

// STOCK
const incrementStock = async (bookId) => {
  try {
    return await issueDAL.incrementBookCopies(bookId);
  } catch (error) {
    const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};

const decrementStock = async (bookId) => {
  try {
    return await issueDAL.decrementBookCopies(bookId);
  } catch (error) {
    const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.BAD_REQUEST;
    throw err;
  }
};

module.exports = {
  createIssue,
  findIssues,
  countIssues,
  findIssueRaw,
  updateIssue,
  softDelete,
  incrementStock,
  decrementStock,
};




// const issueDAL = require("../DAL/issueDAL");
// const APP_CONFIG = require("../constants/appConfig");
// const REPO = require("../constants/errorMessages/repo");
// const { formatIssue, formatIssueList } = require("../DTOs/issueDTO");
// const { STATUS } = require("../constants/statusCodes");

// // CREATE ISSUE
// const createIssue = async (data) => {
//   try {
//     const raw = await issueDAL.create({
//       data,
//       include: { book: true },
//     });

//     return formatIssue(raw);
//   } catch (error) {
//     const err = new Error(`${REPO.CREATE_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };

// // GET ALL ISSUES
// const findAllIssues = async (filters, skip, limit, sortField, sortOrder) => {
//   try {
//     const query = {
//       where: { ...filters, is_deleted: false },
//       skip,
//       take: limit,
//       orderBy: {
//         [sortField || APP_CONFIG.SORT.DEFAULT_FIELD]:
//           sortOrder || APP_CONFIG.SORT.DEFAULT_DIRECTION,
//       },
//       include: { book: true },
//     };

//     const rows = await issueDAL.findMany(query);
//     return formatIssueList(rows);
//   } catch (error) {
//     const err = new Error(`${REPO.FETCH_ISSUES_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.SERVER_ERROR;
//     throw err;
//   }
// };

// // COUNT ISSUES
// const countIssues = async (filters) => {
//   try {
//     return await issueDAL.count({
//       where: { ...filters, is_deleted: false },
//     });
//   } catch (error) {
//     const err = new Error(`${REPO.COUNT_ISSUES_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };

// // FIND ISSUE BY ID
// const findIssueById = async (id) => {
//   try {
//     const raw = await issueDAL.findUnique({
//       where: { id },
//       include: { book: true },
//     });

//     if (!raw) return null;

//     return formatIssue(raw);
//   } catch (error) {
//     const err = new Error(`${REPO.FIND_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.NOT_FOUND;
//     throw err;
//   }
// };

// // RAW FETCH (for internal checks)
// const findIssueRawById = async (id) => {
//   try {
//     return await issueDAL.findUnique({
//       where: { id },
//     });
//   } catch (error) {
//     const err = new Error(`${REPO.FIND_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.NOT_FOUND;
//     throw err;
//   }
// };

// // UPDATE ISSUE
// const updateIssueById = async (id, data) => {
//   try {
//     const raw = await issueDAL.update({
//       where: { id },
//       data,
//       include: { book: true },
//     });

//     return formatIssue(raw);
//   } catch (error) {
//     const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };

// // SOFT DELETE
// const softDeleteIssueById = async (id) => {
//   try {
//     await issueDAL.update({
//       where: { id },
//       data: { is_deleted: true },
//     });
//   } catch (error) {
//     const err = new Error(`${REPO.DELETE_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.SERVER_ERROR;
//     throw err;
//   }
// };

// // BOOK STOCK UPDATES
// const incrementBookCopies = async (bookId) => {
//   try {
//     return await issueDAL.incrementBookCopies(bookId);
//   } catch (error) {
//     const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };

// const decrementBookCopies = async (bookId) => {
//   try {
//     return await issueDAL.decrementBookCopies(bookId);
//   } catch (error) {
//     const err = new Error(`${REPO.UPDATE_ISSUE_FAILED}: ${error.message}`);
//     err.statusCode = STATUS.BAD_REQUEST;
//     throw err;
//   }
// };

// module.exports = { createIssue, findAllIssues, countIssues, findIssueById, findIssueRawById, updateIssueById, softDeleteIssueById, incrementBookCopies, decrementBookCopies, };
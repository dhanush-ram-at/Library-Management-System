const issueRepo = require("../repositories/issueRepository");
const bookRepo  = require("../repositories/bookRepository");

const APP_CONFIG = require("../constants/appConfig");
const ISSUE = require("../constants/errorMessages/issue");
const BOOK  = require("../constants/errorMessages/book");
const { STATUS } = require("../constants/statusCodes");

const generateIssueCode = require("../utils/generateIssueCode");
const { getDaysDifference } = require("../utils/dateUtils");
const { calculatePenalty } = require("../utils/penaltyCalculator");


// LEND BOOK
const lendBook = async (body) => {
  try {
    const bookId = parseInt(body.book_id);
    const userId = parseInt(body.user_id);

    const book = await bookRepo.findBookById(bookId);

    if (!book) {
      const error = new Error(BOOK.NOT_FOUND);
      error.statusCode = STATUS.NOT_FOUND;
      throw error;
    }

    if (book.available_copies <= 0) {
      const error = new Error(BOOK.NO_STOCK);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + APP_CONFIG.LOAN_DAYS);

    const issue = await issueRepo.createIssue({
      data: {
        issue_code: generateIssueCode(),
        book_id: bookId,
        user_id: userId,
        issue_date: issueDate,
        due_date: dueDate,
        issue_status: "Issued",
      },
      include: { book: true },
    });

    await issueRepo.decrementStock(bookId);

    return issue;

  } catch (error) {
    const err = new Error(`${ISSUE.CREATE_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};


// GET ISSUES
const getIssues = async (query, user) => {
  try {
    const page  = parseInt(query.page) || 1;
    const limit = APP_CONFIG.PAGINATION.LIMIT;
    const skip  = (page - 1) * limit;

    const where = { is_deleted: false };

    if (user.role === "MEMBER") {
      where.user_id = user.id;
    }

    if (query.status) {
      where.issue_status = query.status;
    }

    const data = await issueRepo.findIssues({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: { book: true },
    });

    const total = await issueRepo.countIssues({ where });

    return { page, limit, total, data };

  } catch (error) {
    const err = new Error(`${ISSUE.FETCH_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};


// RETURN BOOK
const returnBook = async (id, user) => {
  try {
    const issue = await issueRepo.findIssueRaw({
      where: { id },
    });

    if (!issue) {
      const error = new Error(ISSUE.NOT_FOUND);
      error.statusCode = STATUS.NOT_FOUND;
      throw error;
    }

    if (issue.issue_status === "Returned") {
      const error = new Error(ISSUE.ALREADY_RETURNED);
      error.statusCode = STATUS.BAD_REQUEST;
      throw error;
    }

    if (user.role === "MEMBER" && issue.user_id !== user.id) {
      const error = new Error(ISSUE.UNAUTHORIZED_RETURN);
      error.statusCode = STATUS.FORBIDDEN;
      throw error;
    }

    const returnDate = new Date();
    const delayDays = getDaysDifference(issue.due_date, returnDate);

    const updated = await issueRepo.updateIssue({
      where: { id },
      data: {
        return_date: returnDate,
        issue_status: "Returned",
        delay_days: delayDays,
        delay_status: delayDays > 0 ? "Delayed" : "On Time",
        penalty: calculatePenalty(delayDays),
      },
      include: { book: true },
    });

    await issueRepo.incrementStock(issue.book_id);

    return updated;

  } catch (error) {
    const err = new Error(`${ISSUE.RETURN_FAILED}: ${error.message}`);
    err.statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};


// DELETE ISSUE
const deleteIssue = async (id) => {
  try {
    await issueRepo.softDelete({
      where: { id },
      data: { is_deleted: true },
    });
  } catch (error) {
    const err = new Error(`${ISSUE.DELETE_FAILED}: ${error.message}`);
    err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};


module.exports = { lendBook, getIssues, returnBook, deleteIssue, };




// const issueRepo = require("../repositories/issueRepository");
// const bookRepo  = require("../repositories/bookRepository");

// const APP_CONFIG = require("../constants/appConfig");
// const ISSUE = require("../constants/errorMessages/issue");
// const BOOK  = require("../constants/errorMessages/book");
// const REPO  = require("../constants/errorMessages/repo");

// const generateIssueCode = require("../utils/generateIssueCode");
// const { getDaysDifference } = require("../utils/dateUtils");
// const { calculatePenalty } = require("../utils/penaltyCalculator");


// // LEND BOOK — Admin creates issue
// const lendBook = async (body) => {
//   try {
//     const bookId   = parseInt(body.book_id);
//     const issuedTo = body.issued_to;

//     // Step 1 — check book exists
//     const book = await bookRepo.findBookById(bookId);
//     if (!book) {
//       const error = new Error(BOOK.NOT_FOUND);
//       error.statusCode = 404;
//       throw error;
//     }

//     // Step 2 — check stock
//     if (book.available_copies <= 0) {
//       const error = new Error(BOOK.NO_STOCK);
//       error.statusCode = 400;
//       throw error;
//     }

//     // Step 3 — dates
//     const issueDate = new Date();
//     const dueDate   = new Date();
//     dueDate.setDate(dueDate.getDate() + APP_CONFIG.LOAN_DAYS);

//     // Step 4 — create issue
//     const issue = await issueRepo.createIssue({
//       issue_code:   generateIssueCode(),
//       book_id:      bookId,
//       user_id:      body.user_id,
//       issued_to:    issuedTo,
//       issue_date:   issueDate,
//       due_date:     dueDate,
//       issue_status: "Issued",
//     });

//     // Step 5 — decrement stock
//     await issueRepo.decrementBookCopies(bookId);

//     return issue;

//   } catch (error) {
//     throw error;
//   }
// };


// // GET ISSUES — Search, Filter, Sort, Pagination
// const getIssues = async (query, currentUser) => {
//   try {
//     const page  = parseInt(query.page) || APP_CONFIG.PAGINATION.DEFAULT_PAGE;
//     const limit = APP_CONFIG.PAGINATION.LIMIT;
//     const skip  = (page - 1) * limit;

//     const sortField = query.sort || APP_CONFIG.SORT.DEFAULT_FIELD;
//     const sortOrder = APP_CONFIG.SORT.DEFAULT_DIRECTION;

//     const filters = {};

//     // MEMBER → only their records
//     if (currentUser.role === "MEMBER") {
//       filters.user_id = currentUser.id;
//     }

//     // search
//     if (query.search) {
//       filters.issued_to = { contains: query.search };
//     }

//     // status filter
//     if (query.status) {
//       filters.issue_status = query.status;
//     }

//     // delay filter
//     if (query.filter === "delayed") {
//       filters.delay_status = "Delayed";
//     }

//     if (query.filter === "on_time") {
//       filters.delay_status = "On Time";
//     }

//     const issues = await issueRepo.findAllIssues(
//       filters,
//       skip,
//       limit,
//       sortField,
//       sortOrder
//     );

//     console.log("FILTERS:", filters)
//     console.log("ISSUES:", issues)
//     const total = await issueRepo.countIssues(filters);

//     return {
//       page,
//       limit,
//       total,
//       data: issues,
//     };

//   } catch (error) {
//     const err = new Error(`${REPO.FETCH_ISSUES_FAILED}: ${error.message}`);
//     err.statusCode = 500;
//     throw err;
//   }
// };


// // RETURN BOOK — Core business logic
// const returnBook = async (id, currentUser) => {
//   try {
//     // Step 1 — find issue
//     const issue = await issueRepo.findIssueRawById(id);
//     if (!issue) {
//       const error = new Error(ISSUE.NOT_FOUND);
//       error.statusCode = 404;
//       throw error;
//     }

//     // Step 2 — already returned
//     if (issue.issue_status === "Returned") {
//       const error = new Error(ISSUE.ALREADY_RETURNED);
//       error.statusCode = 400;
//       throw error;
//     }

//     // Step 3 — MEMBER restriction
//     if (currentUser.role === "MEMBER" && issue.user_id !== currentUser.id) {
//       const error = new Error(ISSUE.UNAUTHORIZED_RETURN);
//       error.statusCode = 403;
//       throw error;
//     }

//     // Step 4 — return date
//     const returnDate = new Date();

//     // Step 5 — delay calculation
//     const delayDays = getDaysDifference(issue.due_date, returnDate);

//     // Step 6 — delay status
//     const delayStatus = delayDays > 0 ? "Delayed" : "On Time";

//     // Step 7 — penalty
//     const penalty = calculatePenalty(delayDays);

//     // Step 8 — update issue
//     const updatedIssue = await issueRepo.updateIssueById(id, {
//       return_date:  returnDate,
//       issue_status: "Returned",
//       delay_days:   delayDays,
//       delay_status: delayStatus,
//       penalty:      penalty,
//     });

//     // Step 9 — increment stock
//     await issueRepo.incrementBookCopies(issue.book_id);

//     return updatedIssue;

//   } catch (error) {
//     throw error;
//   }
// };


// // DELETE ISSUE — Soft delete
// const deleteIssue = async (id, currentUser) => {
//   try {
//     const issue = await issueRepo.findIssueRawById(id);

//     if (!issue) {
//       const error = new Error(ISSUE.NOT_FOUND);
//       error.statusCode = 404;
//       throw error;
//     }

//     if (issue.is_deleted === true) {
//       const error = new Error(ISSUE.ALREADY_DELETED);
//       error.statusCode = 400;
//       throw error;
//     }

//     await issueRepo.softDeleteIssueById(id);

//   } catch (error) {
//     throw error;
//   }
// };


// module.exports = { lendBook, getIssues, returnBook, deleteIssue, };
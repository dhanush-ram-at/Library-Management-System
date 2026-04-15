const prisma = require("../config/prismaClient");
const DB = require("../constants/errorMessages/db");


/**
 * @route INTERNAL - DAL Layer
 * @desc Fetch issues with pagination, filtering, sorting, and role-based access
 * @access Internal
 *
 * @param {number} skip - Number of records to skip
 * @param {number} limit - Number of records to fetch
 * @param {string} sortBy - Field to sort by
 * @param {"asc"|"desc"} order - Sort order
 * @param {Object} filters - Filter conditions (status, search, filter)
 * @param {Object} user - Authenticated user
 * @param {string} user.role - User role (ADMIN / MEMBER)
 * @throws {Error} Throws error if query fails
 *
 * @returns {Object} Issues list with total count
 * @author Dhanush
 * @date 2026-04-13
 */
const getIssues = async (skip, limit, sortBy, order, filters, user) => {
  try {
    // dynamic where condition
    const where = {
      is_deleted: false,
    };

    // RBAC → MEMBER sees only own issues
    if (user?.role === "MEMBER") {
      where.user_id = user.id;
    }

    const OR = [];

    // search → book title
    if (filters?.search) {
      OR.push({
        book: {
          title: {
            contains: filters.search
          }
        }
      });
    }

    // filter → issue_status / delay_status
    if (filters?.filter) {
      OR.push(
        { issue_status: filters.filter },
        { delay_status: filters.filter }
      );
    }

    if (filters?.issue_status) {
      OR.push({ issue_status: filters.issue_status });
    }

    // apply OR only once
    if (OR.length > 0) {
      where.OR = OR;
    }

    // execute queries in parallel
    const [issues, total] = await Promise.all([
      prisma.issues.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          book: true,
          user: true,
        },
      }),

      prisma.issues.count({ where }),
    ]);

    return { issues, total };

  } catch (error) {
    throw new Error(`${DB.FIND_ISSUES_FAILED}: ${error.message}`);
  }
};


/**
 * @route INTERNAL - DAL Layer
 * @desc Fetch single issue with related book and user details
 * @access Internal
 *
 * @param {number} issueId - Issue ID
 *
 * @returns {Object|null} Issue record with relations
 * @throws {Error} Throws error if query fails
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const findUniqueIssue = async (issueId) => {
  try {
    return await prisma.issues.findUnique({
      where: { id: issueId },
      include: {
        book: true,
        user: true,
      },
    });

  } catch (error) {
    throw new Error(`${DB.FIND_ISSUE_BY_ID_FAILED}: ${error.message}`);
  }
};


/**
 * @route INTERNAL - DAL Layer
 * @desc Update issue record (return book operation)
 * @access Internal
 *
 * @param {number} issueId - Issue ID
 * @param {Object} data - Update payload
 *
 * @returns {Object} Updated issue record
 * @throws {Error} Throws error if query fails
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const updateIssue = async (issueId, data) => {
  try {
    return await prisma.issues.update({
      where: { id: issueId },
      data,
      include: {
        book: true,
        user: true,
      },
    });

  } catch (error) {
    throw new Error(`${DB.UPDATE_ISSUE_FAILED}: ${error.message}`);
  }
};


/**
 * @route INTERNAL - DAL Layer
 * @desc Update available copies of a book
 * @access Internal
 *
 * @param {number} bookId - Book ID
 * @param {number} increment - +1 (return) / -1 (issue)
 *
 * @returns {Object} Updated book record
 * @throws {Error} Throws error if query fails
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const updateBookStock = async (bookId, increment) => {
  try {
    return await prisma.books.update({
      where: { id: bookId },
      data: {
        available_copies: {
          increment: increment,
        },
      },
    });

  } catch (error) {
    throw new Error(`${DB.UPDATE_BOOK_STOCK_FAILED}: ${error.message}`);
  }
};


/**
 * @route INTERNAL - DAL Layer
 * @desc Soft delete issue (set is_deleted = true)
 * @access Internal
 *
 * @param {number} issueId - Issue ID
 *
 * @returns {Object} Updated issue record
 * @throws {Error} Throws error if query fails
 * 
 * @author Dhanush
 * @date 2026-04-13
 */
const softDeleteIssue = async (issueId) => {
  try {
    return await prisma.issues.update({
      where: { id: issueId },
      data: {
        is_deleted: true,
      },
    });

  } catch (error) {
    throw new Error(`${DB.UPDATE_ISSUE_FAILED}: ${error.message}`);
  }
};


// /**
//  * @route INTERNAL - DAL Layer
//  * @desc Create new issue record (lend book)
//  * @access Internal
//  *
//  * @param {Object} data - Issue data
//  *
//  * @returns {Object} Created issue record
//  * @throws {Error} Throws error if query fails
//  *
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const createIssue = async (data) => {
//   try {
//     return await prisma.issues.create({
//       data,
//       include: {
//         book: true,
//         user: true,
//       },
//     });

//   } catch (error) {
//     throw new Error(`${DB.CREATE_ISSUE_FAILED}: ${error.message}`);
//   }
// };


module.exports = {
  getIssues,
  findUniqueIssue,
  updateIssue,
  updateBookStock,
  softDeleteIssue,
  //createIssue,
};
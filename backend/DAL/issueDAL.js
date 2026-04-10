const prisma = require("../config/prismaClient");
const DB  = require("../constants/errorMessages/db");

// inserts a new issue row when a book is lent
const create = async (query) => {
  try {
    return await prisma.issues.create(query);
  } catch (error) {
    throw new Error(`DB error on creating issue: ${error.message}`);
  }
};

// gets many issues with filters, pagination, sorting
// include: { book: true } joins the book title from books table
const findMany = async (query) => {
  try {
    return await prisma.issues.findMany(query);
  } catch (error) {
    throw new Error(`${DB.FIND_ISSUES_FAILED}: ${error.message}`);
  }
};

// counts total matching issues — used for pagination
const count = async (query) => {
  try {
    return await prisma.issues.count(query);
  } catch (error) {
    throw new Error(`${DB.COUNT_ISSUES_FAILED}: ${error.message}`);
  }
};

// gets one issue by its ID
const findUnique = async (query) => {
  try {
    return await prisma.issues.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_ISSUE_BY_ID_FAILED}: ${error.message}`);
  }
};

// updates an issue row — used when returning a book
const update = async (query) => {
  try {
    return await prisma.issues.update(query);
  } catch (error) {
    throw new Error(`${DB.UPDATE_ISSUE_FAILED}: ${error.message}`);
  }
};

// adds 1 back to available_copies in the books table after a return
const incrementBookCopies = async (bookId) => {
  try {
    return await prisma.books.update({
      where: { id: bookId },
      data:  { available_copies: { increment: 1 } },
      
    });
  } catch (error) {
    throw new Error(`${DB.INCREMENT_COPIES_FAILED}: ${error.message}`);
  }
};

// subtracts 1 from available_copies in the books table when lending
const decrementBookCopies = async (bookId) => {
  try {
    return await prisma.books.update({
      where: { id: bookId },
      data:  { available_copies: { decrement: 1 } },
    });
  } catch (error) {
    throw new Error(`${DB.DECREMENT_COPIES_FAILED}: ${error.message}`);
  }
};

module.exports = { create, findMany, count, findUnique, update, incrementBookCopies, decrementBookCopies };
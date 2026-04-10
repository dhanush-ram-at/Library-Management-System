const prisma = require("../config/prismaClient");
const DB = require("../constants/errorMessages/db");


// gets many books with filters, pagination, sorting
const findMany = async (query) => {
  try {
    return await prisma.books.findMany(query);
  } catch (error) {
    throw new Error(`${DB.FIND_BOOKS_FAILED}: ${error.message}`);
  }
};

// counts total matching books — used for pagination
const count = async (query) => {
  try {
    return await prisma.books.count(query);
  } catch (error) {
    throw new Error(`${DB.COUNT_BOOKS_FAILED}: ${error.message}`);
  }
};

// gets one book by its ID
const findUnique = async (query) => {
  try {
    return await prisma.books.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_BOOK_BY_ID_FAILED}: ${error.message}`);
  }
};

// updates a book row
const update = async (query) => {
  try {
    return await prisma.books.update(query);
  } catch (error) {
    throw new Error(`${DB.UPDATE_BOOK_FAILED}: ${error.message}`);
  }
};

// module.exports = { findMany, count, findUnique, remove, upsert };
module.exports = { findMany, count, findUnique, update };
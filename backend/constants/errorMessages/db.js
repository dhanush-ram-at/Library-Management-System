const DB = {
  // user
  CREATE_USER_FAILED: "DB error on creating user",
  FIND_USER_BY_EMAIL_FAILED: "DB error on finding user by email",
  FIND_USER_BY_ID_FAILED: "DB error on finding user by id",
 
  // book
  CREATE_BOOK_FAILED: "DB error on creating book",
  FIND_BOOKS_FAILED: "DB error on fetching books",
  COUNT_BOOKS_FAILED: "DB error on counting books",
  FIND_BOOK_BY_ID_FAILED: "DB error on finding book by id",
  UPDATE_BOOK_FAILED: "DB error on updating book",
  DELETE_BOOK_FAILED: "DB error on deleting book",
 
  // issue
  CREATE_ISSUE_FAILED: "DB error on creating issue",
  FIND_ISSUES_FAILED: "DB error on fetching issues",
  COUNT_ISSUES_FAILED: "DB error on counting issues",
  FIND_ISSUE_BY_ID_FAILED: "DB error on finding issue by id",
  UPDATE_ISSUE_FAILED: "DB error on updating issue",
  DELETE_ISSUE_FAILED: "DB error on deleting issue",
  INCREMENT_COPIES_FAILED: "DB error on incrementing book copies",
  DECREMENT_COPIES_FAILED: "DB error on decrementing book copies",
};

module.exports = DB;
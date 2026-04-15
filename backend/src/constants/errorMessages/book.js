const BOOK = {
  FETCH_OK: "Books fetched successfully",
  CREATED: "Book created successfully",
  UPDATED: "Book updated successfully",
  DELETED: "Book deleted successfully",
  NOT_FOUND: "Book not found",
  NO_STOCK: "No copies available for issue",

  //validate
  BOOK_TITLE_REQUIRE: "Book title is required",
  AUTHOR_REQUIRE: "Author name is required",
  TOTAL_COPIES_REQUIRE: "Total copies is required",
  TOTAL_COPIES_GREATERTHAN_ZERO: "Total copies must be greater than zero",
  STATUS_REQUIRE: "Status is required",
  BOOK_REQUIRED: "Book is required",
  BOOK_ID_VALID_NUMBER: "Book ID must be a valid number",
  SELECT_MEMBER: "Select member",
  USER_ID_MUST_BE_VALID: "User ID must be a valid number",
};

module.exports = BOOK;
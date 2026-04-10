// response DTO — what we send back to frontend for one book
const formatBook = (book) => ({
  id:               book.id,
  book_code:        book.book_code,
  title:            book.title,
  author_name:      book.author_name,
  total_copies:     book.total_copies,
  available_copies: book.available_copies,
  status:           book.status,
  created_at:       book.created_at,
});

// formats a list of books
const formatBookList = (books) => books.map(formatBook);

module.exports = { formatBook, formatBookList };
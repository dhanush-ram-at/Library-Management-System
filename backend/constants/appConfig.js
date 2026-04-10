const APP_CONFIG = {
 
  // for pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    LIMIT:        10,
  },
 
  // for default sort field and direction
  SORT: {
    DEFAULT_FIELD:     "created_at",
    DEFAULT_DIRECTION: "desc",
  },

  // for token valid time
  TOKEN:{
    ACCESS_TOKEN_EXPERIATION: "15m",
    REFERSH_TOKEN_EXPERIATION: "7d",
  },
 
  // for issue code prefix  →  ISS1719000000000
  ISSUE_CODE_PREFIX: "ISS",
 
  // for book code prefix   →  BOOK001
  BOOK_CODE_PREFIX: "BOOK",
 
  // penalty per day in rupees
  PENALTY_PER_DAY: 10,
 
  // loan period in days
  LOAN_DAYS: 7,
 
  // bcrypt hashing rounds
  BCRYPT_ROUNDS: 10,
 
};
 
module.exports = APP_CONFIG;
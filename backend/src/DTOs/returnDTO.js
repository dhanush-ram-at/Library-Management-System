// REQUEST DTOs
/**
 * @function toGetIssuesQuery
 * @desc Transform query params into issues query DTO
 * @access Internal (DTO)
 *
 * @param {Object} query - Query parameters
 * @param {string|number} query.page - Page number
 * @param {string} [query.status] - Issue status filter
 * @param {string} [query.sort] - Sort field
 *
 * @returns {Object} Formatted DTO
 * @returns {number|string} returns.page - Page number
 * @returns {string|null} returns.status - Issue status filter
 * @returns {string|null} returns.sort - Sort field
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const toGetIssuesQuery = (query) => ({
  page:   query.page,
  status: query.status,
  sort:   query.sort,
  search: query.search || null,
  filter: query.filter || null
});
 
/**
 * @function toIssueIdInput
 * @desc Transform route params into issue ID DTO
 * @access Internal (DTO)
 *
 * @param {Object} params - Route parameters
 * @param {string|number} params.id - Issue ID
 *
 * @returns {Object} Formatted DTO
 * @returns {number} returns.issueId - Parsed issue ID
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const toIssueIdInput = (params) => ({
  issueId: Number(params.id),
});

 
// /**
//  * @function toLendBookInput
//  * @desc Transform request body into lend book DTO
//  * @access Internal (DTO)
//  *
//  * @param {Object} body - Request payload
//  * @param {number} body.book_id - Book ID
//  * @param {number} body.user_id - User ID
//  *
//  * @returns {Object} Formatted DTO
//  * @returns {number} returns.book_id - Book ID
//  * @returns {number} returns.user_id - User ID
//  *
//  * @author Dhanush
//  * @date 2026-04-13
//  */
// const toLendBookInput = (body) => ({
//   book_id: body.book_id,
//   user_id: body.user_id,
// });
 
 
// RESPONSE DTO 
/**
 * @function formatIssue
 * @desc Transform issue DB object into API response format
 * @access Internal (DTO)
 *
 * @param {Object} issue - Issue DB object
 *
 * @returns {Object} Formatted response
 * @returns {number} returns.id - Issue ID
 * @returns {string} returns.issue_code - Issue code
 * @returns {number} returns.book_id - Book ID
 * @returns {number} returns.user_id - User ID
 * @returns {string} returns.issue_date - Issue date
 * @returns {string} returns.due_date - Due date
 * @returns {string|null} returns.return_date - Return date
 * @returns {string} returns.issue_status - Issue status
 * @returns {number} returns.delay_days - Delay days
 * @returns {string|null} returns.delay_status - Delay status
 * @returns {number} returns.penalty - Penalty amount
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const formatIssue = (issue) => ({
  id:           issue.id,
  issue_code:   issue.issue_code,
  book_id:      issue.book_id,
  //book_title:   issue.book?.title || null,
  user_id:      issue.user_id,
  issue_date:   issue.issue_date,
  due_date:     issue.due_date,
  return_date:  issue.return_date  || null,
  issue_status: issue.issue_status,
  delay_days:   issue.delay_days   || 0,
  delay_status: issue.delay_status || null,
  penalty:      issue.penalty      || 0,
  //created_at:   issue.created_at,
});

/**
 * @function formatIssueList
 * @desc Transform array of issue records into response format
 * @access Internal (DTO)
 *
 * @param {Array<Object>} issues - Array of issue DB objects
 *
 * @returns {Array<Object>} Formatted issue list
 *
 * @author Dhanush
 * @date 2026-04-13
 */
const formatIssueList = (issues) => issues.map(formatIssue);
 
 
//module.exports = { toGetIssuesQuery, toGetIssueByIdInput, toReturnBookInput, toDeleteIssueInput, toLendBookInput, formatIssue, formatIssueList, };
module.exports = { toGetIssuesQuery, toIssueIdInput, formatIssue, formatIssueList };

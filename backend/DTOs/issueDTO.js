// REQUEST DTO — for lend book
const toLendBookInput = (body) => ({
  book_id: body.book_id,
  user_id: body.user_id,
});

// RESPONSE DTO
const formatIssue = (issue) => ({
  id:           issue.id,
  issue_code:   issue.issue_code,
  book_id:      issue.book_id,
  book_title:   issue.book?.title || null,
  user_id:      issue.user_id,
  issued_to:    issue.issued_to,
  issue_date:   issue.issue_date,
  due_date:     issue.due_date,
  return_date:  issue.return_date  || null,
  issue_status: issue.issue_status,
  delay_days:   issue.delay_days   || 0,
  delay_status: issue.delay_status || null,
  penalty:      issue.penalty      || 0,
  created_at:   issue.created_at,
});

const formatIssueList = (issues) => issues.map(formatIssue);

module.exports = { toLendBookInput, formatIssue, formatIssueList };
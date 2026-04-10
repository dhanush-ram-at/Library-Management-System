// =====================================================
// TypeScript types for the Issue module
// =====================================================

// shape of one issue record from the backend
export type Issue = {
  id:           number
  issue_code:   string
  book_id:      number
  user_id:      number
  issued_to:    string
  issue_date:   string
  due_date:     string
  return_date:  string | null
  issue_status: string        // "Issued" or "Returned"
  delay_days:   number
  delay_status: string | null // "On Time" or "Delayed" or null
  penalty:      number        // ₹10 per delay day
  created_at:   string
}

// filters sent to GET /api/v1/issues as query params
export type IssueFilters = {
  page:   number
  search: string   // partial match on issued_to
  filter: string   // "delayed" | "on_time" | ""
  sort:   string   // "created_at" | "due_date" | "issue_date"
}

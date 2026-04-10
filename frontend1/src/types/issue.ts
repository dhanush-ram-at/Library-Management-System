export type Issue = {
  id:           number
  issue_code:   string
  book_id:      number
  user_id:      number
  issued_to:    string
  book_title:   string | null
  issue_date:   string
  due_date:     string
  return_date:  string | null
  issue_status: string        // "Issued" or "Returned"
  delay_days:   number
  delay_status: string | null // "On Time" or "Delayed" or null
  penalty:      number
  created_at:   string
}

export type IssueFilters = {
  page:   number
  search: string
  status: string   // "Issued" | "Returned" | ""
  filter: string   // "delayed" | "on_time" | ""
  sort:   string
}
export type Role = "ADMIN" | "MEMBER"

export interface User {
  id:         number
  name:       string
  email:      string
  role:       Role
  created_at: string
}

export interface AuthState {
  user:         User | null
  accessToken:  string | null
  refreshToken: string | null
}

export interface Book {
  id:               number
  book_code:        string
  title:            string
  author_name:      string
  total_copies:     number
  available_copies: number
  status:           "Active" | "Inactive"
  created_at:       string
}

export interface Issue {
  id:           number
  issue_code:   string
  book_id:      number
  user_id:      number
  issue_date:   string
  due_date:     string
  return_date:  string | null
  issue_status: string
  delay_days:   number
  delay_status: string | null
  penalty:      number
  book?:        Book
  user?:        User
}

export interface Pagination {
  total: number
  page:  number
  limit: number
}

export interface IssueFilters {
  search: string
  filter: string
  sort:   string
  page:   number
}

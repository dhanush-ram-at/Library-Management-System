// =====================================================
// API Service
// All axios calls in one place
// Token is attached automatically by the interceptor
// =====================================================

import axios from "axios"
import API_ROUTES from "../Routes/apiRoutes"
import type { IssueFilters } from "../types/issue"

// ── create axios instance with base URL ──────────────────────────────────
export const api = axios.create({
  baseURL: "http://localhost:5000",
})

// ── request interceptor — attach token to every request ─────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── response interceptor — auto-refresh on 401 ──────────────────────────
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config

    // if 401 and not already retried → refresh the token
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        const res = await axios.post(API_ROUTES.AUTH.REFRESH, { refreshToken })
        localStorage.setItem("token", res.data.accessToken)
        original.headers.Authorization = `Bearer ${res.data.accessToken}`
        return api(original)
      } catch {
        // refresh also failed → clear storage and go to login
        localStorage.clear()
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default api

// ── AUTH ─────────────────────────────────────────────────────────────────

// register a new user — does NOT need a token
export const registerUser = (data: {
  name: string
  email: string
  password: string
}) => axios.post(API_ROUTES.AUTH.REGISTER, { ...data, role: "MEMBER" })

// ── ISSUES ───────────────────────────────────────────────────────────────

// get all issues with search, filter, sort, pagination
export const getIssues = (filters: IssueFilters) =>
  api.get(API_ROUTES.ISSUES.BASE, {
    params: {
      page:   filters.page,
      search: filters.search,
      filter: filters.filter,
      sort:   filters.sort,
    },
  })

// return a book — PUT /api/v1/issues/:id/return — no body needed
export const returnBook = (id: number) =>
  api.put(API_ROUTES.ISSUES.RETURN(id), {})

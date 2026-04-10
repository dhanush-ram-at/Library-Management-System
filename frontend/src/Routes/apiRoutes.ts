// =====================================================
// API Routes — all backend URLs in one place
// Change the BASE URL here to update everywhere
// =====================================================

const BASE = "http://localhost:5000/api/v1"

export const API_ROUTES = {
  AUTH: {
    LOGIN:    `${BASE}/auth/login`,
    REGISTER: `${BASE}/auth/register`,
    REFRESH:  `${BASE}/auth/refresh`,
  },
  BOOKS: {
    BASE:  `${BASE}/books`,
    BY_ID: (id: number) => `${BASE}/books/${id}`,
  },
  ISSUES: {
    BASE:   `${BASE}/issues`,
    RETURN: (id: number) => `${BASE}/issues/${id}/return`,
  },
}

export const PAGE_ROUTES = {
  LOGIN:            "/login",
  REGISTER:         "/register",
  ADMIN_DASHBOARD:  "/admin",
  MEMBER_DASHBOARD: "/member",
}

export default API_ROUTES

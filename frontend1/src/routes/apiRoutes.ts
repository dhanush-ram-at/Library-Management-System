const BASE = "http://localhost:5000/api/v1"

export const API_ROUTES = {
  AUTH: {
    LOGIN:    `${BASE}/auth/login`,
    REGISTER: `${BASE}/auth/register`,
    REFRESH:  `${BASE}/auth/refresh`,
  },
  BOOKS: {
    BASE:     `${BASE}/books`,
    DROPDOWN: `${BASE}/books/dropdown`,
  },
  USERS:{
    BASE: `${BASE}/users`,
    DROPDOWN: `${BASE}/users/members`,
  },
  ISSUES: {
    BASE:   `${BASE}/issues`,
    LEND:   `${BASE}/issues/lend`,
    RETURN: (id: number) => `${BASE}/issues/${id}/return`,
    DELETE: (id: number) => `${BASE}/issues/${id}`,
  },
}

export const PAGE_ROUTES = {
  LOGIN:            "/login",
  REGISTER:         "/register",
  ADMIN_DASHBOARD:  "/admin",
  MEMBER_DASHBOARD: "/member",
}

export default API_ROUTES
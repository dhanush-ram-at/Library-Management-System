import axios from "axios"
import API_ROUTES from "../routes/apiRoutes"

// ── axios instance with auto token attach
export const api = axios.create({ baseURL: "http://localhost:5000" })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  //if (token) config.headers.Authorization = `Bearer ${token}`
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── auto refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        // backend wraps refresh result in data.data
        const res = await axios.post(API_ROUTES.AUTH.REFRESH, { refreshToken })
        const newToken = res.data.data?.accessToken || res.data.accessToken
        localStorage.setItem("token", newToken)
        original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      } catch {
        localStorage.clear()
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

// AUTH
export const registerUser = (data: { name: string; email: string; password: string }) =>
  axios.post(API_ROUTES.AUTH.REGISTER, { ...data, role: "MEMBER" })

// BOOKS
export const getBooks = (params: {
  page?: number; search?: string; status?: string; sort?: string
}) => api.get(API_ROUTES.BOOKS.BASE, { params })

export const getBooksDropdown = () => api.get(API_ROUTES.BOOKS.DROPDOWN)

// USERS
export const getMembers = () => api.get(API_ROUTES.USERS.DROPDOWN)
//export const getMembers = () => api.get("/users/members")

// ISSUES
export const getIssues = (params: {
  page?: number; search?: string; status?: string; filter?: string; sort?: string
}) => api.get(API_ROUTES.ISSUES.BASE, { params })

export const lendBook = (data: { book_id: number; user_id: number }) =>
  api.post(API_ROUTES.ISSUES.LEND, data)

export const returnBook = (id: number) =>
  api.put(API_ROUTES.ISSUES.RETURN(id), {})

export const deleteIssue = (id: number) =>
  api.delete(API_ROUTES.ISSUES.DELETE(id))

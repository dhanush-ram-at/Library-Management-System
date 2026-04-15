import axios from "axios"

const BASE_URL = "http://localhost:5000/api/v1"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// ── Request interceptor — attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor — auto-refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          // no refresh token — redirect to login
          localStorage.clear()
          window.location.href = "/login"
          return Promise.reject(error)
        }

        const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        const newAccessToken = res.data.data.accessToken

        localStorage.setItem("accessToken", newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)

      } catch {
        localStorage.clear()
        window.location.href = "/login"
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance

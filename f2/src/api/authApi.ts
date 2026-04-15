import axiosInstance from "./axiosInstance"

export const registerApi = async (data: { name: string; email: string; password: string; role?: string }) => {
  const res = await axiosInstance.post("/auth/register", data)
  return res.data
}

export const loginApi = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data)
  return res.data
}

export const refreshApi = async (refreshToken: string) => {
  const res = await axiosInstance.post("/auth/refresh", { refreshToken })
  return res.data
}

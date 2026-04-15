import { User } from "../types"

export const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem("user")
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const getStoredToken = (): string | null => {
  return localStorage.getItem("accessToken")
}

export const storeAuthData = (user: User, accessToken: string, refreshToken: string) => {
  localStorage.setItem("user",         JSON.stringify(user))
  localStorage.setItem("accessToken",  accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

export const clearAuthData = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export const isAdmin = (user: User | null): boolean => user?.role === "ADMIN"
export const isMember = (user: User | null): boolean => user?.role === "MEMBER"

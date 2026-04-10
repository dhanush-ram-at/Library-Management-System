// =====================================================
// Protected Route
// Redirects to login if no token
// Redirects to correct dashboard if wrong role
// =====================================================

import { Navigate } from "react-router-dom"
import { PAGE_ROUTES } from "./apiRoutes"

type Props = {
  children: JSX.Element
  role?: "ADMIN" | "MEMBER"
}

function ProtectedRoute({ children, role }: Props) {
  const token = localStorage.getItem("token")
  const user  = JSON.parse(localStorage.getItem("user") || "{}")

  // no token → go to login
  if (!token) return <Navigate to={PAGE_ROUTES.LOGIN} replace />

  // wrong role → go to correct dashboard
  if (role && user.role !== role) {
    const correct = user.role === "ADMIN"
      ? PAGE_ROUTES.ADMIN_DASHBOARD
      : PAGE_ROUTES.MEMBER_DASHBOARD
    return <Navigate to={correct} replace />
  }

  return children
}

export default ProtectedRoute

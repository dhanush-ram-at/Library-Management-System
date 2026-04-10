import { Navigate } from "react-router-dom"
import { PAGE_ROUTES } from "./apiRoutes"

type Props = { children: JSX.Element; role?: "ADMIN" | "MEMBER" }

function ProtectedRoute({ children, role }: Props) {
  const token = localStorage.getItem("token")
  let user: any = null
  try {
    const raw = localStorage.getItem("user")
    user = raw && raw !== "undefined" ? JSON.parse(raw) : null
  } catch {
    user = null
  }

  if (!token) return <Navigate to={PAGE_ROUTES.LOGIN} replace />

  if (role && user?.role !== role) {
    const correct = user?.role === "ADMIN" ? PAGE_ROUTES.ADMIN_DASHBOARD : PAGE_ROUTES.MEMBER_DASHBOARD
    return <Navigate to={correct} replace />
  }

  return children
}

export default ProtectedRoute

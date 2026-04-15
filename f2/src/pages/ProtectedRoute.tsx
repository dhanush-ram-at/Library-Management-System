import { Navigate } from "react-router-dom"
import { getStoredUser, getStoredToken } from "../utils/auth"
import { Role } from "../types"

type Props = {
  children:      React.ReactNode
  allowedRoles?: Role[]
}

function ProtectedRoute({ children, allowedRoles }: Props) {
  const user  = getStoredUser()
  const token = getStoredToken()

  // not logged in → redirect to login
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  // wrong role → redirect to their own dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/member"} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

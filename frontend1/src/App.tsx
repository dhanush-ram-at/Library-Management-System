import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import AdminDashboard from "./pages/AdminDashboard"
import MemberDashboard from "./pages/MemberDashboard"
import ProtectedRoute from "./routes/protectedroute"
import { PAGE_ROUTES } from "./routes/apiRoutes"

function App() {
  const token = localStorage.getItem("token")

  let user: any = null
  try {
    const raw = localStorage.getItem("user")
    user = raw && raw !== "undefined" ? JSON.parse(raw) : null
  } catch {
    user = null
  }

  const home = () => {
    if (!token) return PAGE_ROUTES.LOGIN
    return user?.role === "ADMIN" ? PAGE_ROUTES.ADMIN_DASHBOARD : PAGE_ROUTES.MEMBER_DASHBOARD
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={home()} replace />} />
      <Route path={PAGE_ROUTES.LOGIN}
        element={token ? <Navigate to={home()} replace /> : <Login />} />
      <Route path={PAGE_ROUTES.REGISTER} element={<Register />} />
      <Route path={PAGE_ROUTES.ADMIN_DASHBOARD}
        element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path={PAGE_ROUTES.MEMBER_DASHBOARD}
        element={<ProtectedRoute role="MEMBER"><MemberDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={PAGE_ROUTES.LOGIN} replace />} />
    </Routes>
  )
}

export default App

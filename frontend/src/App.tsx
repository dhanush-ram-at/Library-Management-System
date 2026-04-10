// =====================================================
// App.tsx — Route Setup
// Defines all page routes and role protection
// Same pattern as App.tsx in previous task
// =====================================================

import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import AdminDashboard from "./pages/AdminDashboard"
import MemberDashboard from "./pages/MemberDashboard"
import ProtectedRoute from "./Routes/protectedroute"
import { PAGE_ROUTES } from "./Routes/apiRoutes"

function App() {
  const token = localStorage.getItem("token")
  const user  = JSON.parse(localStorage.getItem("user") || "{}")

  // decide where to redirect the root path
  const home = () => {
    if (!token) return PAGE_ROUTES.LOGIN
    return user.role === "ADMIN"
      ? PAGE_ROUTES.ADMIN_DASHBOARD
      : PAGE_ROUTES.MEMBER_DASHBOARD
  }

  return (
    <Routes>

      {/* root path → redirect to correct page */}
      <Route path="/" element={<Navigate to={home()} replace />} />

      {/* if already logged in, /login redirects to dashboard */}
      <Route
        path={PAGE_ROUTES.LOGIN}
        element={token ? <Navigate to={home()} replace /> : <Login />}
      />

      <Route path={PAGE_ROUTES.REGISTER} element={<Register />} />

      {/* ADMIN only route */}
      <Route
        path={PAGE_ROUTES.ADMIN_DASHBOARD}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* MEMBER only route */}
      <Route
        path={PAGE_ROUTES.MEMBER_DASHBOARD}
        element={
          <ProtectedRoute role="MEMBER">
            <MemberDashboard />
          </ProtectedRoute>
        }
      />

      {/* any unknown path → go to login */}
      <Route path="*" element={<Navigate to={PAGE_ROUTES.LOGIN} replace />} />

    </Routes>
  )
}

export default App

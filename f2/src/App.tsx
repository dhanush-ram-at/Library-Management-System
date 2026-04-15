import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login          from "./pages/login"
import Register       from "./pages/register"
import AdminDashboard from "./pages/AdminDashboard"
import MemberDashboard from "./pages/MemberDashboard"
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login"    element={<Login />}    />
        <Route path="/register" element={<Register />} />

        {/* Admin protected route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Member protected route */}
        <Route
          path="/member"
          element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

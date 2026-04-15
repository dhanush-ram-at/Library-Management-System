import {
  Box, Card, Typography, Alert, Divider
} from "@mui/material"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginApi } from "../api/authApi"
import { storeAuthData } from "../utils/auth"
import { authStyles } from "../constants/styles/authStyles"
import AppTextField from "../components/common/AppTextField"
import AppButton    from "../components/common/AppButton"

function Login() {
  const navigate = useNavigate()

  const [form,    setForm]    = useState({ email: "", password: "" })
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.email)    return "Email is required"
    if (!form.password) return "Password is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) return "Invalid email format"
    return ""
  }

  const handleLogin = async () => {
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError("")

    try {
      const res = await loginApi(form)
      const { user, accessToken, refreshToken } = res.data
      storeAuthData(user, accessToken, refreshToken)

      if (user.role === "ADMIN") {
        navigate("/admin")
      } else {
        navigate("/member")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <Box sx={authStyles.pageWrapper}>
      <Card sx={authStyles.card}>
        <Typography variant="h5" sx={authStyles.title}>
          📚 Library System
        </Typography>
        <Typography sx={authStyles.subtitle}>
          Sign in to your account
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

        <AppTextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
        />
        <AppTextField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
        />

        <AppButton
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={authStyles.primaryButton}
        >
          {loading ? "Signing in..." : "Sign In"}
        </AppButton>

        <Divider sx={authStyles.divider} />

        <Typography sx={{ textAlign: "center", fontSize: 14 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>Register</Link>
        </Typography>
      </Card>
    </Box>
  )
}

export default Login

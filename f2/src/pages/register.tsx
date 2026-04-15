import {
  Box, Card, Typography, Alert, Divider
} from "@mui/material"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerApi } from "../api/authApi"
import { authStyles }  from "../constants/styles/authStyles"
import AppTextField    from "../components/common/AppTextField"
import AppButton       from "../components/common/AppButton"
import AppSelect       from "../components/common/AppSelect"

function Register() {
  const navigate = useNavigate()

  const [form,    setForm]    = useState({ name: "", email: "", password: "", role: "MEMBER" })
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.name)     return "Name is required"
    if (!form.email)    return "Email is required"
    if (!form.password) return "Password is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) return "Invalid email format"
    return ""
  }

  const handleRegister = async () => {
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError("")

    try {
      await registerApi(form)
      navigate("/login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={authStyles.pageWrapper}>
      <Card sx={authStyles.card}>
        <Typography variant="h5" sx={authStyles.title}>
          📚 Library System
        </Typography>
        <Typography sx={authStyles.subtitle}>
          Create a new account
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

        <AppTextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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

        <AppSelect
          label="Role"
          value={form.role}
          onChange={(val) => setForm((prev) => ({ ...prev, role: val }))}
          options={[
            { value: "MEMBER", label: "Member" },
            { value: "ADMIN",  label: "Admin"  },
          ]}
        />

        <Typography sx={authStyles.roleNote}>
          * Select ADMIN only if you have admin access
        </Typography>

        <AppButton
          fullWidth
          onClick={handleRegister}
          disabled={loading}
          sx={authStyles.primaryButton}
        >
          {loading ? "Registering..." : "Register"}
        </AppButton>

        <Divider sx={authStyles.divider} />

        <Typography sx={{ textAlign: "center", fontSize: 14 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>Sign In</Link>
        </Typography>
      </Card>
    </Box>
  )
}

export default Register

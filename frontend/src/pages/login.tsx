// =====================================================
// Login Page
// Validates email and password before API call
// ADMIN → /admin | MEMBER → /member
// Same pattern as login.tsx in previous task
// =====================================================

import { useState } from "react"
import { Box, Paper, Typography, Divider } from "@mui/material"
import axios from "axios"
import { API_ROUTES, PAGE_ROUTES } from "../Routes/apiRoutes"
import AppTextField from "../components/common/AppTextField"
import AppButton from "../components/common/AppButton"
import { authStyles } from "../constants/styles/authStyles"

function Login() {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passErr,  setPassErr]  = useState("")
  const [loginErr, setLoginErr] = useState("")

  // client-side validation before API call
  const validate = () => {
    let ok = true
    setEmailErr(""); setPassErr(""); setLoginErr("")
    if (!email.trim())    { setEmailErr("Email is required");    ok = false }
    if (!password.trim()) { setPassErr("Password is required");  ok = false }
    return ok
  }

  const handleLogin = async () => {
    if (!validate()) return
    try {
      const res = await axios.post(API_ROUTES.AUTH.LOGIN, { email, password })

      // save token, refreshToken, user in localStorage
      localStorage.setItem("token",        res.data.accessToken)
      localStorage.setItem("refreshToken", res.data.refreshToken)
      localStorage.setItem("user",         JSON.stringify(res.data.user))

      // redirect based on role
      window.location.href = res.data.user.role === "ADMIN"
        ? PAGE_ROUTES.ADMIN_DASHBOARD
        : PAGE_ROUTES.MEMBER_DASHBOARD
    } catch {
      setLoginErr("Invalid email or password")
    }
  }

  return (
    <Box sx={authStyles.pageWrapper}>
      <Paper sx={authStyles.card}>

        <Typography variant="h5" sx={authStyles.title}>
          Library Management System
        </Typography>
        <Typography sx={authStyles.subtitle}>
          Sign in to continue
        </Typography>

        <AppTextField
          label="Email"
          name="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailErr("") }}
          error={!!emailErr}
          helperText={emailErr}
        />

        <AppTextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setPassErr("") }}
          error={!!passErr}
          helperText={passErr}
        />

        {/* show error from API response */}
        {loginErr && (
          <Typography sx={authStyles.errorText}>{loginErr}</Typography>
        )}

        <AppButton fullWidth onClick={handleLogin} sx={authStyles.primaryButton}>
          Login
        </AppButton>

        <Divider sx={authStyles.divider}>
          <Typography sx={authStyles.dividerText}>OR</Typography>
        </Divider>

        <AppButton
          fullWidth
          variant="outlined"
          onClick={() => window.location.href = PAGE_ROUTES.REGISTER}
          sx={authStyles.secondaryButton}
        >
          Create New Account
        </AppButton>

      </Paper>
    </Box>
  )
}

export default Login

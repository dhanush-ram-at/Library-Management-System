import { useState } from "react"
import { Box, Paper, Typography, Divider } from "@mui/material"
import axios from "axios"
import { API_ROUTES, PAGE_ROUTES } from "../routes/apiRoutes"
import AppTextField from "../components/common/AppTextField"
import AppButton from "../components/common/AppButton"
import { authStyles } from "../constants/styles/authStyles"

function Login() {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passErr,  setPassErr]  = useState("")
  const [loginErr, setLoginErr] = useState("")
  const [loading,  setLoading]  = useState(false)

  const validate = () => {
    let ok = true
    setEmailErr(""); setPassErr(""); setLoginErr("")
    if (!email.trim())    { setEmailErr("Email is required");    ok = false }
    if (!password.trim()) { setPassErr("Password is required");  ok = false }
    return ok
  }

  const handleLogin = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await axios.post(API_ROUTES.AUTH.LOGIN, { email, password })

      // Backend wraps response in res.data.data
      const { accessToken, refreshToken, user } = res.data.data

      localStorage.setItem("token",        accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("user",         JSON.stringify(user))

      window.location.href = user.role === "ADMIN"
        ? PAGE_ROUTES.ADMIN_DASHBOARD
        : PAGE_ROUTES.MEMBER_DASHBOARD

    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid email or password"
      setLoginErr(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={authStyles.pageWrapper}>
      <Paper sx={authStyles.card}>
        <Typography variant="h5" sx={authStyles.title}>
          Library Management System
        </Typography>
        <Typography sx={authStyles.subtitle}>Sign in to continue</Typography>

        <AppTextField
          label="Email" name="email" value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailErr("") }}
          error={!!emailErr} helperText={emailErr}
        />

        <AppTextField
          label="Password" name="password" type="password" value={password}
          onChange={(e) => { setPassword(e.target.value); setPassErr("") }}
          error={!!passErr} helperText={passErr}
        />

        {loginErr && (
          <Typography sx={authStyles.errorText}>{loginErr}</Typography>
        )}

        <AppButton
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={authStyles.primaryButton}
        >
          {loading ? "Logging in..." : "Login"}
        </AppButton>

        <Divider sx={authStyles.divider}>
          <Typography sx={authStyles.dividerText}>OR</Typography>
        </Divider>

        <AppButton
          fullWidth
          variant="outlined"
          onClick={() => { window.location.href = PAGE_ROUTES.REGISTER }}
          sx={authStyles.secondaryButton}
        >
          Create New Account
        </AppButton>
      </Paper>
    </Box>
  )
}

export default Login
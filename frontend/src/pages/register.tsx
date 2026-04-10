// =====================================================
// Register Page
// Validates name, email, password before API call
// On success → SweetAlert → redirect to login
// Same pattern as register.tsx in previous task
// =====================================================

import { useState } from "react"
import { Box, Paper, Typography, Divider } from "@mui/material"
import Swal from "sweetalert2"
import { PAGE_ROUTES } from "../Routes/apiRoutes"
import { registerUser } from "../services/api"
import AppTextField from "../components/common/AppTextField"
import AppButton from "../components/common/AppButton"
import { COLORS } from "../constants/styles/theme"
import { authStyles } from "../constants/styles/authStyles"

function Register() {
  const [name,     setName]     = useState("")
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [nameErr,  setNameErr]  = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passErr,  setPassErr]  = useState("")

  // client-side validation before API call
  const validate = () => {
    let ok = true
    setNameErr(""); setEmailErr(""); setPassErr("")
    if (!name.trim())  { setNameErr("Name is required");    ok = false }
    if (!email.trim()) { setEmailErr("Email is required");  ok = false }
    else if (!email.includes("@")) { setEmailErr("Enter a valid email"); ok = false }
    if (!password)                 { setPassErr("Password is required"); ok = false }
    else if (password.length < 6)  { setPassErr("Minimum 6 characters"); ok = false }
    return ok
  }

  const handleRegister = async () => {
    if (!validate()) return
    try {
      await registerUser({ name, email, password })

      // show success popup then go to login
      await Swal.fire({
        icon:               "success",
        title:              "Account Created!",
        text:               "You can now login.",
        confirmButtonText:  "Go to Login",
        confirmButtonColor: COLORS.primary,
      })
      window.location.href = PAGE_ROUTES.LOGIN
    } catch (err: any) {
      Swal.fire({
        icon:               "error",
        title:              "Register Failed",
        text:               err?.response?.data?.message || "Something went wrong. Try again.",
        confirmButtonColor: COLORS.error,
      })
    }
  }

  return (
    <Box sx={authStyles.pageWrapper}>
      <Paper sx={authStyles.card}>

        <Typography variant="h5" sx={authStyles.title}>
          Create Account
        </Typography>
        <Typography sx={authStyles.subtitle}>
          Register as a new member
        </Typography>

        <AppTextField
          label="Full Name" name="name" value={name}
          onChange={(e) => { setName(e.target.value); setNameErr("") }}
          error={!!nameErr} helperText={nameErr}
        />

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

        {/* role is always MEMBER for self-registration */}
        <Typography sx={authStyles.roleNote}>
          Role: Member (default)
        </Typography>

        <AppButton fullWidth onClick={handleRegister} sx={authStyles.primaryButton}>
          Register
        </AppButton>

        <Divider sx={authStyles.divider}>
          <Typography sx={authStyles.dividerText}>OR</Typography>
        </Divider>

        <AppButton
          fullWidth variant="outlined"
          onClick={() => window.location.href = PAGE_ROUTES.LOGIN}
          sx={authStyles.secondaryButton}
        >
          Back to Login
        </AppButton>

      </Paper>
    </Box>
  )
}

export default Register

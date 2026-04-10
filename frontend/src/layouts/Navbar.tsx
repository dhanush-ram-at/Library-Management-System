// =====================================================
// Navbar
// Shows app title, user name, role chip, logout button
// Used on both Admin and Member dashboards
// =====================================================

import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material"
import Swal from "sweetalert2"
import { PAGE_ROUTES } from "../Routes/apiRoutes"
import AppButton from "../components/common/AppButton"
import { COLORS } from "../constants/styles/theme"
import { navbarStyles } from "../constants/styles/navbarStyles"

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = () => {
    Swal.fire({
      title:             "Logout?",
      text:              "Are you sure you want to logout?",
      icon:              "question",
      showCancelButton:  true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText:  "Stay",
      confirmButtonColor: COLORS.error,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        window.location.href = PAGE_ROUTES.LOGIN
      }
    })
  }

  return (
    <AppBar position="static" sx={navbarStyles.appBar}>
      <Toolbar>

        <Typography variant="h6" sx={navbarStyles.title}>
          Library Management System
        </Typography>

        <Box sx={navbarStyles.rightSection}>

          {/* show logged-in user's name */}
          <Typography sx={navbarStyles.userName}>
            {user.name}
          </Typography>

          {/* show role chip — orange for ADMIN, green for MEMBER */}
          <Chip
            label={user.role}
            size="small"
            sx={user.role === "ADMIN" ? navbarStyles.adminChip : navbarStyles.memberChip}
          />

          <AppButton
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleLogout}
            sx={navbarStyles.logoutButton}
          >
            Logout
          </AppButton>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

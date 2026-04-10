import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material"
import Swal from "sweetalert2"
import { PAGE_ROUTES } from "../routes/apiRoutes"
import AppButton from "../components/common/AppButton"
import { COLORS } from "../constants/styles/theme"
import { navbarStyles } from "../constants/styles/navbarStyles"

function Navbar() {
  let user: any = null
  try {
    const raw = localStorage.getItem("user")
    user = raw && raw !== "undefined" ? JSON.parse(raw) : null
  } catch {
    user = null
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Stay",
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
          <Typography sx={navbarStyles.userName}>{user?.name || ""}</Typography>

          <Chip
            label={user?.role || ""}
            size="small"
            sx={user?.role === "ADMIN" ? navbarStyles.adminChip : navbarStyles.memberChip}
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
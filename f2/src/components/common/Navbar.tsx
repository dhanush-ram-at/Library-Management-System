import { AppBar, Toolbar, Typography, Chip, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { User } from "../../types"
import { clearAuthData } from "../../utils/auth"
import { navbarStyles } from "../../constants/styles/navbarStyles"
import AppButton from "./AppButton"

type Props = {
  user: User
}

function Navbar({ user }: Props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuthData()
    navigate("/login")
  }

  return (
    <AppBar position="static" sx={navbarStyles.appBar}>
      <Toolbar>
        <Typography variant="h6" sx={navbarStyles.title}>
          📚 Library Management System
        </Typography>
        <Box sx={navbarStyles.rightSection}>
          <Typography sx={navbarStyles.userName}>{user.name}</Typography>
          <Chip
            label={user.role}
            size="small"
            sx={user.role === "ADMIN" ? navbarStyles.adminChip : navbarStyles.memberChip}
          />
          <AppButton
            variant="outlined"
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

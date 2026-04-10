// =====================================================
// Member Dashboard
// Shows only the logged-in member's issued books
// Member can return only their own books
// Same pattern as UserDashboard in previous task
// =====================================================

import { Box, Typography, Paper } from "@mui/material"
import Navbar from "../layouts/Navbar"
import MemberIssueTable from "../components/member/MemberIssueTable"
import { dashboardStyles } from "../constants/styles/dashboardStyles"

function MemberDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <>
      <Navbar />
      <Box sx={dashboardStyles.pageWrapper}>

        {/* welcome banner — shows member name */}
        <Paper variant="outlined" sx={dashboardStyles.welcomeBanner}>
          <Box>
            <Typography variant="h5" sx={dashboardStyles.welcomeTitle}>
              Welcome, {user.name}!
            </Typography>
            <Typography sx={dashboardStyles.welcomeSubtitle}>
              Here are your issued books
            </Typography>
          </Box>
        </Paper>

        {/* member's own issues table */}
        <MemberIssueTable />

      </Box>
    </>
  )
}

export default MemberDashboard

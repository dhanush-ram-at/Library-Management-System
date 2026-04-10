import { Box, Typography, Paper } from "@mui/material"
import Navbar from "../layouts/Navbar"
import AvailableBooksTable from "../components/admin/AvailableBooksTable"
import MemberIssueTable from "../components/member/MemberIssueTable"
import { dashboardStyles } from "../constants/styles/dashboardStyles"

function MemberDashboard() {
  let user: any = null
  try {
    const raw = localStorage.getItem("user")
    user = raw && raw !== "undefined" ? JSON.parse(raw) : null
  } catch {
    user = null
  }

  return (
    <>
      <Navbar />
      <Box sx={dashboardStyles.pageWrapper}>

        <Paper variant="outlined" sx={dashboardStyles.welcomeBanner}>
          <Box>
            <Typography variant="h5" sx={dashboardStyles.welcomeTitle}>
              Welcome, {user?.name || "Member"}!
            </Typography>
            <Typography sx={dashboardStyles.welcomeSubtitle}>
              View available books and your borrowed books below
            </Typography>
          </Box>
        </Paper>

        <Typography variant="h5" sx={dashboardStyles.pageTitle}>
          Available Books
        </Typography>
        <AvailableBooksTable />

        <Typography variant="h5" sx={dashboardStyles.sectionTitle}>
          My Borrowed Books
        </Typography>
        <MemberIssueTable />

      </Box>
    </>
  )
}

export default MemberDashboard

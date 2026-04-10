// =====================================================
// Admin Dashboard
// Shows the issues table with all members' records
// ADMIN can return any book
// Same pattern as AdminDashboard in previous task
// =====================================================

import { Box, Typography } from "@mui/material"
import Navbar from "../layouts/Navbar"
import IssueTable from "../components/admin/IssueTable"
import { dashboardStyles } from "../constants/styles/dashboardStyles"

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <Box sx={dashboardStyles.pageWrapper}>

        <Typography variant="h5" sx={dashboardStyles.pageTitle}>
          All Issued Books
        </Typography>

        {/* main table — search, filter, sort, return */}
        <IssueTable />

      </Box>
    </>
  )
}

export default AdminDashboard

import { Box, Typography } from "@mui/material"
import Navbar from "../layouts/Navbar"
import AvailableBooksTable from "../components/admin/AvailableBooksTable"
import LendedBooksTable from "../components/admin/LendedBooksTable"
import { dashboardStyles } from "../constants/styles/dashboardStyles"

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <Box sx={dashboardStyles.pageWrapper}>

        <Typography variant="h5" sx={dashboardStyles.pageTitle}>
          Available Books
        </Typography>
        <AvailableBooksTable />

        <Typography variant="h5" sx={dashboardStyles.sectionTitle}>
          Lended Books
        </Typography>
        <LendedBooksTable />

      </Box>
    </>
  )
}

export default AdminDashboard
// =====================================================
// MemberIssueTable — Member view
// Shows only the logged-in member's own issued books
// Member can return only their own books
// Same pattern as UserOrderTable in previous task
// =====================================================

import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getIssues, returnBook } from "../../services/api"
import AppButton from "../common/AppButton"
import type { Issue, IssueFilters as FilterType } from "../../types/issue"
import { COLORS, ISSUE_STATUS_COLORS, DELAY_STATUS_COLORS } from "../../constants/styles/theme"
import { tableStyles } from "../../constants/styles/tableStyles"

// default filters — no search or filter applied on load
const DEFAULT_FILTERS: FilterType = {
  page:   1,
  search: "",
  filter: "",
  sort:   "created_at",
}

function MemberIssueTable() {
  const [issues,  setIssues]  = useState<Issue[]>([])
  const [total,   setTotal]   = useState(0)
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)

  // backend filters by user_id automatically for MEMBER role
  const loadIssues = async () => {
    try {
      const res = await getIssues(filters)
      setIssues(res.data.data)
      setTotal(res.data.total)
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load your issued books." })
    }
  }

  useEffect(() => { loadIssues() }, [filters])

  // called when member clicks Return on their own book
  const handleReturn = (issue: Issue) => {
    Swal.fire({
      title:             "Return Book?",
      text:              "Do you want to return this book?",
      icon:              "question",
      showCancelButton:  true,
      confirmButtonText: "Yes, Return",
      cancelButtonText:  "No",
      confirmButtonColor: COLORS.primary,
    }).then(async (result) => {
      if (!result.isConfirmed) return

      try {
        await returnBook(issue.id)
        await Swal.fire({
          icon:              "success",
          title:             "Returned!",
          timer:             1500,
          showConfirmButton: false,
        })
        // refresh table after return
        loadIssues()
      } catch (err: any) {
        const msg = err.response?.data?.message || "Failed to return book."
        Swal.fire({
          icon:               "error",
          title:              "Error",
          text:               msg,
          confirmButtonColor: COLORS.error,
        })
      }
    })
  }

  const columns: GridColDef[] = [
    {
      field: "sno", headerName: "S.No", width: 70, sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        (filters.page - 1) * 10 + issues.findIndex((i) => i.id === params.row.id) + 1,
    },
    { field: "issue_code", headerName: "Issue Code", width: 150 },
    {
      field: "issue_date", headerName: "Issue Date", width: 120,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.value).toLocaleDateString(),
    },
    {
      field: "due_date", headerName: "Due Date", width: 120,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.value).toLocaleDateString(),
    },
    {
      field: "return_date", headerName: "Return Date", width: 120,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? new Date(params.value).toLocaleDateString() : "—",
    },
    {
      field: "issue_status", headerName: "Status", width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          color={ISSUE_STATUS_COLORS[params.value as string] ?? "default"}
        />
      ),
    },
    {
      field: "delay_status", headerName: "Delay", width: 110,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? (
          <Chip
            label={params.value}
            size="small"
            color={DELAY_STATUS_COLORS[params.value as string] ?? "default"}
          />
        ) : "—",
    },
    {
      field: "penalty", headerName: "Penalty (₹)", width: 110,
      renderCell: (params: GridRenderCellParams) =>
        params.value > 0 ? `₹ ${params.value}` : "—",
    },
    {
      // member can only return their own books — no edit, no delete
      field: "actions", headerName: "Actions", width: 120, sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const issue = params.row as Issue
        return (
          <AppButton
            size="small"
            onClick={() => handleReturn(issue)}
            disabled={issue.issue_status === "Returned"}
          >
            Return
          </AppButton>
        )
      },
    },
  ]

  return (
    <Box>
      <Paper variant="outlined" sx={tableStyles.tablePaper}>
        <DataGrid
          rows={issues}
          columns={columns}
          getRowId={(row) => row.id}
          rowCount={total}
          pageSizeOptions={[10]}
          paginationMode="server"
          paginationModel={{ page: filters.page - 1, pageSize: 10 }}
          onPaginationModelChange={(model) =>
            setFilters({ ...filters, page: model.page + 1 })
          }
          disableRowSelectionOnClick
          autoHeight
          sx={tableStyles.dataGrid}
        />
      </Paper>
    </Box>
  )
}

export default MemberIssueTable

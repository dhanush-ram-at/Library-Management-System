import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getIssues, returnBook, deleteIssue } from "../../services/api"
import IssueFilters from "./IssueFilters"
import LendBookDialog from "./LendBookDialog"
import AppButton from "../common/AppButton"
import type { Issue, IssueFilters as FilterType } from "../../types/issue"
import { COLORS, ISSUE_STATUS_COLORS, DELAY_STATUS_COLORS } from "../../constants/styles/theme"
import { tableStyles } from "../../constants/styles/tableStyles"

const DEFAULT_FILTERS: FilterType = {
  page: 1, search: "", status: "", filter: "", sort: "created_at",
}

function LendedBooksTable() {
  const [issues,   setIssues] = useState<Issue[]>([])
  const [total, setTotal] = useState(0)
  const [filters,  setFilters]  = useState<FilterType>(DEFAULT_FILTERS)
  const [openLend, setOpenLend] = useState(false)

  const loadIssues = async () => {
    try {
      const res = await getIssues(filters)
      setIssues(res.data.data)
      setTotal(res.data.pagination?.total ?? 0)
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load issued books." })
    }
  }

  useEffect(() => { loadIssues() }, [filters])

  const handleReturn = (issue: Issue) => {
    Swal.fire({
      title: "Return Book?",
      text: `Return "${issue.book_title}" issued to ${issue.issued_to}?`,
      icon: "question", showCancelButton: true,
      confirmButtonText: "Yes, Return",
      confirmButtonColor: COLORS.primary,
    }).then(async (result) => {
      if (!result.isConfirmed) return
      try {
        await returnBook(issue.id)
        await Swal.fire({ icon: "success", title: "Returned!", timer: 1500, showConfirmButton: false })
        loadIssues()
      } catch (err: any) {
        Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || "Failed to return book.", confirmButtonColor: COLORS.error })
      }
    })
  }

  const handleDelete = (issue: Issue) => {
    Swal.fire({
      title: "Delete Record?",
      text: "This will soft delete the issue record.",
      icon: "warning", showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: COLORS.error,
    }).then(async (result) => {
      if (!result.isConfirmed) return
      try {
        await deleteIssue(issue.id)
        await Swal.fire({ 
          icon: "success", 
          title: "Deleted!", 
          timer: 1500, 
          showConfirmButton: false 
        })
        loadIssues()
      } catch (err: any) {
        Swal.fire({ 
          icon: "error", 
          title: "Error", 
          text: err.response?.data?.message || "Failed to delete.", 
          confirmButtonColor: COLORS.error 
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
    { field: "book_title", headerName: "Book Name",  width: 180 },
    { field: "user_id",  headerName: "User ID",  width: 140 },
    {
      field: "issue_date", headerName: "Issue Date", width: 120,
      renderCell: (p: GridRenderCellParams) => new Date(p.value).toLocaleDateString(),
    },
    {
      field: "due_date", headerName: "Due Date", width: 120,
      renderCell: (p: GridRenderCellParams) => new Date(p.value).toLocaleDateString(),
    },
    {
      field: "return_date", headerName: "Return Date", width: 120,
      renderCell: (p: GridRenderCellParams) =>
        p.value ? new Date(p.value).toLocaleDateString() : "—",
    },
    {
      field: "issue_status", headerName: "Status", width: 110,
      renderCell: (p: GridRenderCellParams) => (
        <Chip label={p.value} size="small"
          color={ISSUE_STATUS_COLORS[p.value as string] ?? "default"} />
      ),
    },
    {
      field: "delay_status", headerName: "Delay", width: 110,
      renderCell: (p: GridRenderCellParams) =>
        p.value ? (
          <Chip label={p.value} size="small"
            color={DELAY_STATUS_COLORS[p.value as string] ?? "default"} />
        ) : <span>—</span>,
    },
    {
      field: "penalty", headerName: "Penalty (₹)", width: 110,
      renderCell: (p: GridRenderCellParams) => p.value > 0 ? `₹ ${p.value}` : "—",
    },
    {
      field: "actions", headerName: "Actions", width: 190, sortable: false,
      renderCell: (p: GridRenderCellParams) => {
        const issue = p.row as Issue
        return (
          <Box sx={tableStyles.actionCell}>
            <AppButton
              size="small"
              onClick={() => handleReturn(issue)}
              disabled={issue.issue_status === "Returned"}
            >
              return
            </AppButton>
            <AppButton size="small" color="error" onClick={() => handleDelete(issue)}>
              Delete
            </AppButton>
          </Box>
        )
      },
    },
  ]

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <AppButton onClick={() => setOpenLend(true)}>+ Lend Book</AppButton>
      </Box>

      <IssueFilters
        filters={filters}
        setFilters={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

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

      <LendBookDialog open={openLend} setOpen={setOpenLend} reloadIssues={loadIssues} />
    </Box>
  )
}

export default LendedBooksTable

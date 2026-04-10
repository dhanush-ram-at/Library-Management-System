// =====================================================
// IssueTable — Admin view
// Shows all issued books with search, filter, sort
// ADMIN can click Return on any Issued record
// Same pattern as AdminOrderTable in previous task
// =====================================================

import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getIssues, returnBook } from "../../services/api"
import IssueFilters from "./IssueFilters"
import AppButton from "../common/AppButton"
import type { Issue, IssueFilters as FilterType } from "../../types/issue"
import { COLORS, ISSUE_STATUS_COLORS, DELAY_STATUS_COLORS } from "../../constants/styles/theme"
import { tableStyles } from "../../constants/styles/tableStyles"

// default filters when page first loads
const DEFAULT_FILTERS: FilterType = {
  page:   1,
  search: "",
  filter: "",
  sort:   "created_at",
}

function IssueTable() {
  const [issues,  setIssues]  = useState<Issue[]>([])
  const [total,   setTotal]   = useState(0)
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)

  // fetch issues from API whenever filters change
  const loadIssues = async () => {
    try {
      const res = await getIssues(filters)
      setIssues(res.data.data)
      setTotal(res.data.total)
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load issues." })
    }
  }

  useEffect(() => { loadIssues() }, [filters])

  // called when ADMIN clicks Return button
  const handleReturn = (issue: Issue) => {
    Swal.fire({
      title:             "Return Book?",
      text:              `Mark "${issue.issued_to}"'s book as returned?`,
      icon:              "question",
      showCancelButton:  true,
      confirmButtonText: "Yes, Return",
      cancelButtonText:  "No",
      confirmButtonColor: COLORS.primary,
    }).then(async (result) => {
      if (!result.isConfirmed) return

      try {
        await returnBook(issue.id)
        // show success for 1.5 seconds then auto close
        await Swal.fire({
          icon:              "success",
          title:             "Returned!",
          timer:             1500,
          showConfirmButton: false,
        })
        // refresh the table after return
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

  // DataGrid column definitions
  const columns: GridColDef[] = [
    {
      // S.No — calculated from page and row index
      field: "sno", headerName: "S.No", width: 70, sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        (filters.page - 1) * 10 + issues.findIndex((i) => i.id === params.row.id) + 1,
    },
    { field: "issue_code", headerName: "Issue Code", width: 150 },
    { field: "issued_to",  headerName: "Issued To",  width: 140 },
    {
      // format date to readable string
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
      // show dash if not yet returned
      field: "return_date", headerName: "Return Date", width: 120,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? new Date(params.value).toLocaleDateString() : "—",
    },
    {
      // Issued = orange chip, Returned = green chip
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
      // On Time = green chip, Delayed = red chip, null = dash
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
      // show penalty with ₹ symbol, show dash if 0
      field: "penalty", headerName: "Penalty", width: 100,
      renderCell: (params: GridRenderCellParams) =>
        params.value > 0 ? `₹ ${params.value}` : "—",
    },
    {
      field: "actions", headerName: "Actions", width: 120, sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const issue = params.row as Issue
        return (
          <Box sx={tableStyles.actionCell}>
            {/* Return button — disabled for already returned books */}
            <AppButton
              size="small"
              onClick={() => handleReturn(issue)}
              disabled={issue.issue_status === "Returned"}
            >
              Return
            </AppButton>
          </Box>
        )
      },
    },
  ]

  return (
    <Box>

      {/* search, filter, sort bar */}
      <IssueFilters
        filters={filters}
        setFilters={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      {/* DataGrid — server-side pagination, uses id as row key */}
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

export default IssueTable

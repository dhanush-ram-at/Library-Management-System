import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getIssues } from "../../services/api"
import type { Issue, IssueFilters as FilterType } from "../../types/issue"
import { ISSUE_STATUS_COLORS, DELAY_STATUS_COLORS } from "../../constants/styles/theme"
import { tableStyles } from "../../constants/styles/tableStyles"
import IssueFilters from "../admin/IssueFilters"

const DEFAULT_FILTERS: FilterType = {
  page: 1, search: "", status: "", filter: "", sort: "created_at",
}

function MemberIssueTable() {
  const [issues,  setIssues]  = useState<Issue[]>([])
  const [total,   setTotal]   = useState(0)
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)

  const loadIssues = async () => {
    try {
      const res = await getIssues(filters)
      setIssues(res.data.data)
      setTotal(res.data.pagination?.total ?? 0)
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load your books." })
    }
  }

  useEffect(() => { loadIssues() }, [filters])

  const columns: GridColDef[] = [
    {
      field: "sno", headerName: "S.No", width: 70, sortable: false,
      renderCell: (p: GridRenderCellParams) =>
        (filters.page - 1) * 10 + issues.findIndex((i) => i.id === p.row.id) + 1,
    },
    { field: "book_title", headerName: "Book Name", width: 200 },
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
      field: "delay_status", headerName: "Delay Status", width: 120,
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
  ]

  return (
    <Box>
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
    </Box>
  )
}

export default MemberIssueTable

import { Paper, Chip } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Issue } from "../../types"
import { tableStyles } from "../../constants/styles/tableStyles"
import { ISSUE_STATUS_COLORS, DELAY_STATUS_COLORS } from "../../constants/styles/theme"
import AppButton from "./AppButton"

type Props = {
  rows:        Issue[]
  total:       number
  page:        number
  loading:     boolean
  isAdmin:     boolean
  onPageChange: (page: number) => void
  onReturn:    (issue: Issue) => void
  onDelete?:   (issue: Issue) => void
}

function IssueTable({
  rows, total, page, loading, isAdmin,
  onPageChange, onReturn, onDelete,
}: Props) {

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    })
  }

  const columns: GridColDef[] = [
    { field: "id",         headerName: "S.No",       width: 70 },
    { field: "issue_code", headerName: "Issue Code",  width: 160 },
    {
      field: "book_id",
      headerName: "Book Title",
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        params.row.book?.title || `Book #${params.row.book_id}`,
    },
    ...(isAdmin
      ? [{
          field: "user_id",
          headerName: "Member",
          width: 150,
          renderCell: (params: GridRenderCellParams) =>
            params.row.user?.name || `User #${params.row.user_id}`,
        }]
      : []
    ),
    {
      field: "issue_date",
      headerName: "Issue Date",
      width: 120,
      renderCell: (params: GridRenderCellParams) => formatDate(params.row.issue_date),
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 120,
      renderCell: (params: GridRenderCellParams) => formatDate(params.row.due_date),
    },
    {
      field: "return_date",
      headerName: "Return Date",
      width: 120,
      renderCell: (params: GridRenderCellParams) => formatDate(params.row.return_date),
    },
    {
      field: "issue_status",
      headerName: "Status",
      width: 110,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.row.issue_status
        const color  = ISSUE_STATUS_COLORS[status] || "default"
        return <Chip label={status} color={color as any} size="small" />
      },
    },
    {
      field: "delay_status",
      headerName: "Delay",
      width: 110,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.row.delay_status
        if (!status) return "—"
        const color = DELAY_STATUS_COLORS[status] || "default"
        return <Chip label={status === "ON_TIME" ? "On Time" : status === "DELAYED" ? "Delayed" : status} color={color as any} size="small" />
      },
    },
    {
      field: "penalty",
      headerName: "Penalty (₹)",
      width: 110,
      renderCell: (params: GridRenderCellParams) =>
        params.row.penalty > 0 ? `₹${params.row.penalty}` : "—",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isAdmin ? 200 : 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const issue = params.row as Issue
        const isReturned = issue.issue_status === "Returned" || issue.issue_status === "RETURNED"
        return (
          <div style={{ display: "flex", gap: 6, alignItems: "center", height: "100%" }}>
            <AppButton
              size="small"
              variant="outlined"
              color="success"
              disabled={isReturned}
              onClick={() => onReturn(issue)}
              sx={{ textTransform: "none", fontSize: 12 }}
            >
              {isReturned ? "Returned" : "Return"}
            </AppButton>
            {isAdmin && onDelete && (
              <AppButton
                size="small"
                variant="outlined"
                color="error"
                onClick={() => onDelete(issue)}
                sx={{ textTransform: "none", fontSize: 12 }}
              >
                Delete
              </AppButton>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <Paper sx={tableStyles.tablePaper}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        pageSizeOptions={[10]}
        paginationMode="server"
        rowCount={total}
        paginationModel={{ page: page - 1, pageSize: 10 }}
        onPaginationModelChange={(model) => onPageChange(model.page + 1)}
        disableRowSelectionOnClick
        sx={tableStyles.dataGrid}
      />
    </Paper>
  )
}

export default IssueTable

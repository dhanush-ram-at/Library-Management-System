import { Paper, Chip } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Book } from "../../types"
import { tableStyles } from "../../constants/styles/tableStyles"

type Props = {
  rows:        Book[]
  total:       number
  page:        number
  loading:     boolean
  onPageChange: (page: number) => void
}

function BookTable({ rows, total, page, loading, onPageChange }: Props) {

  const columns: GridColDef[] = [
    { field: "id",               headerName: "S.No",      width: 70 },
    { field: "book_code",        headerName: "Book Code",  width: 120 },
    { field: "title",            headerName: "Title",      width: 220, flex: 1 },
    { field: "author_name",      headerName: "Author",     width: 180 },
    { field: "total_copies",     headerName: "Total",      width: 90 },
    { field: "available_copies", headerName: "Available",  width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "default"}
          size="small"
        />
      ),
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

export default BookTable

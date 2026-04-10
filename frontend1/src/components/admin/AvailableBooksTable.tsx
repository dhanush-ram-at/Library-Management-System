import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getBooks } from "../../services/api"
import BookFilters from "./BookFilters"
import { tableStyles } from "../../constants/styles/tableStyles"

type Book = {
  id:               number
  book_code:        string
  title:            string
  author_name:      string
  total_copies:     number
  available_copies: number
  status:           string
}

type FilterType = { page: number; search: string; status: string; sort: string }

const DEFAULT_FILTERS: FilterType = { page: 1, search: "", status: "", sort: "created_at" }

function AvailableBooksTable() {
  const [books,   setBooks]   = useState<Book[]>([])
  const [total,   setTotal]   = useState(0)
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)

  const loadBooks = async () => {
    try {
      const res = await getBooks(filters)
      setBooks(res.data.data)
      setTotal(res.data.pagination?.total ?? 0)
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load books." })
    }
  }

  useEffect(() => { loadBooks() }, [filters])

  const columns: GridColDef[] = [
    {
      field: "sno", headerName: "S.No", width: 70, sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        (filters.page - 1) * 10 + books.findIndex((b) => b.id === params.row.id) + 1,
    },
    { field: "book_code",        headerName: "Book Code",       width: 140 },
    { field: "title",            headerName: "Title",           width: 200 },
    { field: "author_name",      headerName: "Author",          width: 160 },
    { field: "total_copies",     headerName: "Total Copies",    width: 120 },
    { field: "available_copies", headerName: "Available",       width: 110 },
    {
      field: "status", headerName: "Status", width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === "Active" ? "success" : "default"}
        />
      ),
    },
  ]

  return (
    <Box>
      <BookFilters
        filters={filters}
        setFilters={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <Paper variant="outlined" sx={tableStyles.tablePaper}>
        <DataGrid
          rows={books}
          columns={columns}
          getRowId={(row) => row.id}
          rowCount={total}
          pageSizeOptions={[10]}
          paginationMode="server"
          paginationModel={{ page: filters.page - 1, pageSize: 10 }}
          onPaginationModelChange={(model) =>
            setFilters((prev) => ({ ...prev, page: model.page + 1 }))
          }
          disableRowSelectionOnClick
          autoHeight
          sx={tableStyles.dataGrid}
        />
      </Paper>
    </Box>
  )
}

export default AvailableBooksTable

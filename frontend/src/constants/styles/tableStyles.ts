import { COLORS } from "./theme"

export const tableStyles = {
  // paper that wraps the DataGrid
  tablePaper: {
    mt:           2,
    borderRadius: 2,
    overflow:     "hidden",
  },
  // sx passed into the DataGrid
  dataGrid: {
    border: 0,
    "& .MuiDataGrid-columnHeaders": {
      background: COLORS.tableHeader,
      fontWeight: 700,
    },
    "& .MuiDataGrid-row:hover": {
      background: COLORS.rowHover,
    },
  },
  // box wrapping action buttons inside a row
  actionCell: {
    display:    "flex",
    gap:        0.8,
    alignItems: "center",
    height:     "100%",
  },
}

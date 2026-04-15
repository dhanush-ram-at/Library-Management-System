import { COLORS } from "./theme"

export const tableStyles = {
  tablePaper: { mt: 2, borderRadius: 2, overflow: "hidden" },
  dataGrid: {
    border: 0,
    "& .MuiDataGrid-columnHeaders": { background: COLORS.tableHeader, fontWeight: 700 },
    "& .MuiDataGrid-row:hover":     { background: COLORS.rowHover },
  },
  actionCell: { textTransform: "lowercase", display: "flex", gap: 0.8, alignItems: "center", height: "100%" },
}

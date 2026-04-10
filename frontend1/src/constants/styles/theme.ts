export const COLORS = {
  primary:       "#1976d2",
  primaryDark:   "#115293",
  success:       "#2e7d32",
  warning:       "#ed6c02",
  error:         "#d32f2f",
  white:         "#ffffff",
  background:    "#f5f5f5",
  surface:       "#ffffff",
  textPrimary:   "#212121",
  textSecondary: "#757575",
  border:        "#e0e0e0",
  rowHover:      "#f0f7ff",
  tableHeader:   "#f5f5f5",
}

// Status chip colors for issue_status column
export const ISSUE_STATUS_COLORS: Record<string, "success" | "warning"> = {
  Returned: "success",
  Issued:   "warning",
}

// Delay chip colors for delay_status column
export const DELAY_STATUS_COLORS: Record<string, "success" | "error"> = {
  "On Time": "success",
  "Delayed": "error",
}
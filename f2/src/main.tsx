import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    success: { main: "#2e7d32" },
    warning: { main: "#ed6c02" },
    error:   { main: "#d32f2f" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

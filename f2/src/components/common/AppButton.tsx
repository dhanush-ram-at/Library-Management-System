import { Button } from "@mui/material"
import React from "react"

type Props = {
  children:  React.ReactNode
  onClick?:  () => void
  variant?:  "contained" | "outlined" | "text"
  color?:    "primary" | "error" | "warning" | "success" | "inherit"
  fullWidth?: boolean
  disabled?: boolean
  size?:     "small" | "medium" | "large"
  sx?:       object
  type?:     "button" | "submit" | "reset"
}

function AppButton({
  children, onClick,
  variant = "contained", color = "primary",
  fullWidth = false, disabled = false,
  size = "medium", sx = {}, type = "button",
}: Props) {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      sx={sx}
    >
      {children}
    </Button>
  )
}

export default AppButton

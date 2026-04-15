import { TextField } from "@mui/material"
import React from "react"

type Props = {
  label:       string
  name:        string
  value:       string
  onChange:    (e: React.ChangeEvent<HTMLInputElement>) => void
  type?:       string
  error?:      boolean
  helperText?: string
  disabled?:   boolean
}

function AppTextField({ label, name, value, onChange, type = "text", error, helperText, disabled }: Props) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
      helperText={helperText}
      disabled={disabled}
      {...(type === "date" ? { InputLabelProps: { shrink: true } } : {})}
      sx={{ mt: 2 }}
    />
  )
}

export default AppTextField

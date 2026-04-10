// =====================================================
// AppTextField — reusable text input component
// Wraps MUI TextField with standard props
// =====================================================

import { TextField } from "@mui/material"

type Props = {
  label:          string
  name:           string
  value:          string
  onChange:       (e: React.ChangeEvent<HTMLInputElement>) => void
  type?:          string
  error?:         boolean
  helperText?:    string
  disabled?:      boolean
  InputLabelProps?: object
  size?:          "small" | "medium"
}

function AppTextField({
  label,
  name,
  value,
  onChange,
  type            = "text",
  error,
  helperText,
  disabled,
  InputLabelProps,
  size            = "medium",
}: Props) {
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
      size={size}
      // for date fields, always shrink the label
      InputLabelProps={InputLabelProps ?? (type === "date" ? { shrink: true } : undefined)}
      sx={{ mt: 2 }}
    />
  )
}

export default AppTextField

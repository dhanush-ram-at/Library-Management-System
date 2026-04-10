// =====================================================
// AppSelect — reusable dropdown component
// Wraps MUI Select with standard props
// =====================================================

import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material"

type Option = { value: string; label: string }

type Props = {
  label:    string
  value:    string
  onChange: (value: string) => void
  options:  Option[]
  error?:   string
  size?:    "small" | "medium"
  width?:   number | string
}

function AppSelect({ label, value, onChange, options, error, size = "medium", width }: Props) {
  return (
    <FormControl
      fullWidth={!width}
      size={size}
      error={!!error}
      sx={{ mt: 2, ...(width ? { width } : {}) }}
    >
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default AppSelect

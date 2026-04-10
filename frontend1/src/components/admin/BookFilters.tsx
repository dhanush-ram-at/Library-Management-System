import { Box, TextField, Paper } from "@mui/material"
import AppSelect from "../common/AppSelect"
import AppButton from "../common/AppButton"
import { filterStyles } from "../../constants/styles/filterStyles"

type BookFiltersType = { page: number; search: string; status: string; sort: string }

type Props = {
  filters:    BookFiltersType
  setFilters: (f: BookFiltersType) => void
  onReset:    () => void
}

const STATUS_OPTIONS = [
  { value: "",         label: "All Statuses" },
  { value: "Active",   label: "Active"       },
  { value: "Inactive", label: "Inactive"     },
]

const SORT_OPTIONS = [
  { value: "created_at", label: "Newest First" },
  { value: "title",      label: "Title A-Z"    },
]

function BookFilters({ filters, setFilters, onReset }: Props) {
  const handleChange = (field: keyof BookFiltersType, value: string | number) => {
    setFilters({ ...filters, [field]: value, page: 1 })
  }

  return (
    <Paper variant="outlined" sx={filterStyles.filterPaper}>
      <Box sx={filterStyles.filterRow}>

        <TextField
          label="Search by title or author"
          size="small"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          sx={filterStyles.searchField}
        />

        <AppSelect
          label="Status" value={filters.status}
          onChange={(val) => handleChange("status", val)}
          options={STATUS_OPTIONS} size="small" width={150}
        />

        <AppSelect
          label="Sort By" value={filters.sort}
          onChange={(val) => handleChange("sort", val)}
          options={SORT_OPTIONS} size="small" width={150}
        />

        <AppButton
          variant="outlined" size="small"
          onClick={onReset} sx={filterStyles.resetButton}
        >
          Reset
        </AppButton>

      </Box>
    </Paper>
  )
}

export default BookFilters



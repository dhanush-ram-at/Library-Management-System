import { Box, TextField, Paper } from "@mui/material"
import AppSelect from "../common/AppSelect"
import AppButton from "../common/AppButton"
import type { IssueFilters } from "../../types/issue"
import { filterStyles } from "../../constants/styles/filterStyles"

type Props = {
  filters:    IssueFilters
  setFilters: (f: IssueFilters) => void
  onReset:    () => void
}

const STATUS_OPTIONS = [
  { value: "",         label: "All"      },
  { value: "Issued",   label: "Issued"   },
  { value: "Returned", label: "Returned" },
]

const SORT_OPTIONS = [
  { value: "created_at", label: "Created Date" },
  { value: "due_date",   label: "Due Date"     },
  { value: "issue_date", label: "Issue Date"   },
]

function IssueFilters({ filters, setFilters, onReset }: Props) {
  const handleChange = (field: keyof IssueFilters, value: string | number) => {
    setFilters({ ...filters, [field]: value, page: 1 })
  }

  return (
    <Paper variant="outlined" sx={filterStyles.filterPaper}>
      <Box sx={filterStyles.filterRow}>

        <TextField
          label="Search by member name"
          size="small"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          sx={filterStyles.searchField}
        />

        <AppSelect
          label="Status" value={filters.status}
          onChange={(val) => handleChange("status", val)}
          options={STATUS_OPTIONS} size="small" width={140}
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

export default IssueFilters

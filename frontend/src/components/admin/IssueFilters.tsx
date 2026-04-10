// =====================================================
// IssueFilters
// Search by name, filter by delay status, sort
// Same pattern as OrderFilters in previous task
// =====================================================

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

// dropdown options for delay status filter
const FILTER_OPTIONS = [
  { value: "",         label: "All"      },
  { value: "delayed",  label: "Delayed"  },
  { value: "on_time",  label: "On Time"  },
]

// dropdown options for sort
const SORT_OPTIONS = [
  { value: "created_at", label: "Created Date" },
  { value: "due_date",   label: "Due Date"      },
  { value: "issue_date", label: "Issue Date"    },
]

function IssueFilters({ filters, setFilters, onReset }: Props) {

  // update one filter field and reset page to 1
  const handleChange = (field: keyof IssueFilters, value: string | number) => {
    setFilters({ ...filters, [field]: value, page: 1 })
  }

  return (
    <Paper variant="outlined" sx={filterStyles.filterPaper}>
      <Box sx={filterStyles.filterRow}>

        {/* search by member name */}
        <TextField
          label="Search by member name"
          size="small"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          sx={filterStyles.searchField}
        />

        {/* filter by delay status */}
        <AppSelect
          label="Delay Status"
          value={filters.filter}
          onChange={(val) => handleChange("filter", val)}
          options={FILTER_OPTIONS}
          size="small"
          width={160}
        />

        {/* sort by date field */}
        <AppSelect
          label="Sort By"
          value={filters.sort}
          onChange={(val) => handleChange("sort", val)}
          options={SORT_OPTIONS}
          size="small"
          width={160}
        />

        {/* reset all filters */}
        <AppButton
          variant="outlined"
          size="small"
          onClick={onReset}
          sx={filterStyles.resetButton}
        >
          Reset
        </AppButton>

      </Box>
    </Paper>
  )
}

export default IssueFilters

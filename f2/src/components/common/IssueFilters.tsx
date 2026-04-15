import { Paper, Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import { filterStyles } from "../../constants/styles/filterStyles"
import AppButton from "./AppButton"

type Props = {
  search:        string
  filter:        string
  sort:          string
  onSearchChange: (val: string) => void
  onFilterChange: (val: string) => void
  onSortChange:   (val: string) => void
  onReset:        () => void
}

function IssueFilters({
  search, filter, sort,
  onSearchChange, onFilterChange, onSortChange, onReset,
}: Props) {
  return (
    <Paper sx={filterStyles.filterPaper}>
      <Box sx={filterStyles.filterRow}>

        {/* Search */}
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={filterStyles.searchField}
          placeholder="Search by book title..."
        />

        {/* Filter by status */}
        <FormControl size="small" sx={{ width: 180 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            label="Filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="DELAYED">Delayed</MenuItem>
            <MenuItem value="ON_TIME">On Time</MenuItem>
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl size="small" sx={{ width: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="created_at">Date Created</MenuItem>
            <MenuItem value="issue_date">Issue Date</MenuItem>
            <MenuItem value="due_date">Due Date</MenuItem>
          </Select>
        </FormControl>

        {/* Reset */}
        <AppButton
          variant="outlined"
          color="inherit"
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

import {
  Box, Typography, Paper, TextField,
} from "@mui/material"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import { getStoredUser } from "../utils/auth"
import { getBooksApi }   from "../api/bookApi"
import { getIssuesApi, returnBookApi } from "../api/issueApi"

import { Book, Issue } from "../types"

import Navbar       from "../components/common/Navbar"
import BookTable    from "../components/common/BookTable"
import IssueTable   from "../components/common/IssueTable"
import IssueFilters from "../components/common/IssueFilters"
import AppButton    from "../components/common/AppButton"

import { dashboardStyles } from "../constants/styles/dashboardStyles"
import { filterStyles }    from "../constants/styles/filterStyles"

function MemberDashboard() {
  const navigate = useNavigate()
  const user = getStoredUser()

  // redirect if not member
  useEffect(() => {
    if (!user) { navigate("/login"); return }
    if (user.role === "ADMIN") navigate("/admin")
  }, [])

  // ── Books state
  const [books,       setBooks]       = useState<Book[]>([])
  const [bookTotal,   setBookTotal]   = useState(0)
  const [bookPage,    setBookPage]    = useState(1)
  const [bookSearch,  setBookSearch]  = useState("")
  const [bookLoading, setBookLoading] = useState(false)

  // ── Issues state
  const [issues,       setIssues]       = useState<Issue[]>([])
  const [issueTotal,   setIssueTotal]   = useState(0)
  const [issuePage,    setIssuePage]    = useState(1)
  const [issueSearch,  setIssueSearch]  = useState("")
  const [issueFilter,  setIssueFilter]  = useState("")
  const [issueSort,    setIssueSort]    = useState("created_at")
  const [issueLoading, setIssueLoading] = useState(false)

  // ── Fetch books (all active books visible to member)
  const fetchBooks = useCallback(async () => {
    setBookLoading(true)
    try {
      const res = await getBooksApi({ page: bookPage, search: bookSearch, status: "Active" })
      setBooks(res.data || [])
      setBookTotal(res.pagination?.total || 0)
    } catch {
      Swal.fire("Error", "Failed to fetch books", "error")
    } finally {
      setBookLoading(false)
    }
  }, [bookPage, bookSearch])

  // ── Fetch only this member's issues (backend handles filtering by user_id via JWT)
  const fetchIssues = useCallback(async () => {
    setIssueLoading(true)
    try {
      const res = await getIssuesApi({
        page:   issuePage,
        search: issueSearch,
        filter: issueFilter,
        sort:   issueSort,
      })
      setIssues(res.data || [])
      setIssueTotal(res.pagination?.total || 0)
    } catch {
      Swal.fire("Error", "Failed to fetch your issued books", "error")
    } finally {
      setIssueLoading(false)
    }
  }, [issuePage, issueSearch, issueFilter, issueSort])

  useEffect(() => { fetchBooks()  }, [fetchBooks])
  useEffect(() => { fetchIssues() }, [fetchIssues])

  // ── Return book handler
  const handleReturn = async (issue: Issue) => {
    const isReturned = issue.issue_status === "Returned" || issue.issue_status === "RETURNED"
    if (isReturned) return

    const result = await Swal.fire({
      title:             "Return Book?",
      text:              "Are you sure you want to return this book?",
      icon:              "question",
      showCancelButton:  true,
      confirmButtonText: "Yes, Return",
      cancelButtonText:  "Cancel",
    })

    if (!result.isConfirmed) return

    try {
      await returnBookApi(issue.id)
      Swal.fire("Success", "Book returned successfully", "success")
      fetchIssues()
      fetchBooks()
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to return book"
      Swal.fire("Error", msg, "error")
    }
  }

  // ── Reset issue filters
  const handleIssueReset = () => {
    setIssueSearch("")
    setIssueFilter("")
    setIssueSort("created_at")
    setIssuePage(1)
  }

  if (!user) return null

  return (
    <Box>
      <Navbar user={user} />

      <Box sx={dashboardStyles.pageWrapper}>

        {/* Welcome Banner */}
        <Paper sx={dashboardStyles.welcomeBanner} elevation={1}>
          <Box>
            <Typography variant="h6" sx={dashboardStyles.welcomeTitle}>
              Welcome, {user.name} 👋
            </Typography>
            <Typography sx={dashboardStyles.welcomeSubtitle}>
              Browse available books and manage your borrowed books
            </Typography>
          </Box>
        </Paper>

        {/* ── Available Books Section */}
        <Typography variant="h6" sx={dashboardStyles.sectionTitle}>
          📚 Available Books
        </Typography>

        {/* Book search */}
        <Paper sx={filterStyles.filterPaper}>
          <Box sx={filterStyles.filterRow}>
            <TextField
              label="Search Books"
              size="small"
              value={bookSearch}
              onChange={(e) => { setBookSearch(e.target.value); setBookPage(1) }}
              sx={filterStyles.searchField}
              placeholder="Search by title or author..."
            />
            <AppButton
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => { setBookSearch(""); setBookPage(1) }}
              sx={filterStyles.resetButton}
            >
              Reset
            </AppButton>
          </Box>
        </Paper>

        <BookTable
          rows={books}
          total={bookTotal}
          page={bookPage}
          loading={bookLoading}
          onPageChange={(p) => setBookPage(p)}
        />

        {/* ── My Issued Books Section */}
        <Typography variant="h6" sx={dashboardStyles.sectionTitle}>
          📋 My Borrowed Books
        </Typography>

        <IssueFilters
          search={issueSearch}
          filter={issueFilter}
          sort={issueSort}
          onSearchChange={(val) => { setIssueSearch(val); setIssuePage(1) }}
          onFilterChange={(val) => { setIssueFilter(val); setIssuePage(1) }}
          onSortChange={(val)   => { setIssueSort(val);   setIssuePage(1) }}
          onReset={handleIssueReset}
        />

        {/* Member sees no Delete button — isAdmin=false */}
        <IssueTable
          rows={issues}
          total={issueTotal}
          page={issuePage}
          loading={issueLoading}
          isAdmin={false}
          onPageChange={(p) => setIssuePage(p)}
          onReturn={handleReturn}
        />

      </Box>
    </Box>
  )
}

export default MemberDashboard

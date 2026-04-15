import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, CircularProgress,
} from "@mui/material"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { getBooksDropdownApi } from "../../api/bookApi"
import { getMembersApi }       from "../../api/issueApi"
import { lendBookApi }         from "../../api/issueApi"
import { dialogStyles }        from "../../constants/styles/dialogStyles"
import AppButton               from "../common/AppButton"
import AppSelect               from "../common/AppSelect"

type Props = {
  open:      boolean
  onClose:   () => void
  onSuccess: () => void
}

function LendBookDialog({ open, onClose, onSuccess }: Props) {
  const [bookId,   setBookId]   = useState<string>("")
  const [userId,   setUserId]   = useState<string>("")
  const [books,    setBooks]    = useState<{ id: number; title: string }[]>([])
  const [members,  setMembers]  = useState<{ id: number; name: string }[]>([])
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(false)
  const [errors,   setErrors]   = useState({ book_id: "", user_id: "" })

  // load books and members when dialog opens
  useEffect(() => {
    if (!open) return
    const load = async () => {
      setFetching(true)
      try {
        const [booksRes, membersRes] = await Promise.all([
          getBooksDropdownApi(),
          getMembersApi(),
        ])
        setBooks(booksRes.data || [])
        setMembers(membersRes.data || [])
      } catch {
        Swal.fire("Error", "Failed to load data", "error")
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [open])

  const handleClose = () => {
    setBookId("")
    setUserId("")
    setErrors({ book_id: "", user_id: "" })
    onClose()
  }

  const validate = () => {
    const errs = { book_id: "", user_id: "" }
    if (!bookId) errs.book_id = "Book is required"
    if (!userId) errs.user_id = "Member is required"
    setErrors(errs)
    return !errs.book_id && !errs.user_id
  }

  const handleLend = async () => {
    if (!validate()) return

    const result = await Swal.fire({
      title: "Issue Book?",
      text:  "Are you sure you want to issue this book?",
      icon:  "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Issue",
      cancelButtonText:  "Cancel",
    })

    if (!result.isConfirmed) return

    setLoading(true)
    try {
      await lendBookApi({ book_id: parseInt(bookId), user_id: parseInt(userId) })
      Swal.fire("Success", "Book issued successfully", "success")
      onSuccess()
      handleClose()
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to issue book"
      Swal.fire("Error", msg, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography sx={dialogStyles.lendTitle}>Issue Book to Member</Typography>
      </DialogTitle>

      <DialogContent>
        {fetching ? (
          <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
        ) : (
          <>
            <AppSelect
              label="Select Book"
              value={bookId}
              onChange={setBookId}
              options={books.map((b) => ({ value: b.id, label: b.title }))}
              error={errors.book_id}
            />
            <AppSelect
              label="Select Member"
              value={userId}
              onChange={setUserId}
              options={members.map((m) => ({ value: m.id, label: m.name }))}
              error={errors.user_id}
            />
          </>
        )}
      </DialogContent>

      <DialogActions sx={dialogStyles.actions}>
        <AppButton variant="outlined" color="inherit" onClick={handleClose}>
          Cancel
        </AppButton>
        <AppButton onClick={handleLend} disabled={loading}>
          {loading ? "Issuing..." : "Issue Book"}
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}

export default LendBookDialog

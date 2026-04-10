import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { getBooksDropdown, lendBook } from "../../services/api"
import AppSelect from "../common/AppSelect"
import AppButton from "../common/AppButton"
import { dialogStyles } from "../../constants/styles/dialogStyles"
import { getMembers } from "../../services/api"

type Props = {
  open:         boolean
  setOpen:      (v: boolean) => void
  reloadIssues: () => void
}

function LendBookDialog({ open, setOpen, reloadIssues }: Props) {
  const [books,    setBooks]    = useState<{ id: number; title: string }[]>([])
  const [bookId,   setBookId]   = useState("")
  const [bookErr,  setBookErr]  = useState("")
  const [loading,  setLoading]  = useState(false)
  const [members, setMembers] = useState<{ id: number; name: string }[]>([])
  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (open) {
      setBookId("")
      setUserId("")

      getBooksDropdown()
        .then(res => setBooks(res.data.data || []))
        .catch(() => setBooks([]))

      getMembers()
        .then(res => {
          console.log("MEMBERS:", res.data)   // 🔥 IMPORTANT
          setMembers(res.data.data || [])
        })
        .catch(err => {
          console.error("MEMBER ERROR:", err)
          setMembers([])
        })
    }
  }, [open])

  const memberOptions = members.map(m => ({
    value: String(m.id),
    label: m.name
  }))
  const handleLend = async () => {
    if (!bookId || !userId) {
      Swal.fire("Error", "Select book and member", "error")
      return
    }

    setLoading(true)

    try {
      await lendBook({
        book_id: parseInt(bookId),
        user_id: parseInt(userId),
      })

      setOpen(false)
      await Swal.fire({
        icon: "success",
        title: "Book Issued!",
        timer: 1500,
        showConfirmButton: false,
      })

      reloadIssues()

    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to issue book."
      Swal.fire({ icon: "error", title: "Error", text: msg })
    } finally {
      setLoading(false)
    }
  }

  const bookOptions = books.map((b) => ({ value: String(b.id), label: b.title }))

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <DialogTitle sx={dialogStyles.lendTitle}>Lend Book</DialogTitle>

      <DialogContent>
        <AppSelect
          label="Select Book"
          value={bookId}
          onChange={(val) => { setBookId(val); setBookErr("") }}
          options={[{ value: "", label: "-- Select a Book --" }, ...bookOptions]}
          error={bookErr}
        />

        <AppSelect
          label="Select Member"
          value={userId}
          onChange={(val) => setUserId(val)}
          options={[{ value: "", label: "-- Select Member --" }, ...memberOptions]}
        />
        
      </DialogContent>

      <DialogActions sx={dialogStyles.actions}>
        <AppButton variant="outlined" onClick={() => setOpen(false)}>
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

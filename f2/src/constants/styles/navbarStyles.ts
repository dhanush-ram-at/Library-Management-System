import { COLORS } from "./theme"

export const navbarStyles = {
  appBar:       { background: COLORS.primary },
  title:        { flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 },
  rightSection: { display: "flex", alignItems: "center", gap: 1.5 },
  userName:     { color: COLORS.white, fontWeight: 500 },
  adminChip:    { background: COLORS.warning, color: COLORS.white, fontWeight: 600, fontSize: 11 },
  memberChip:   { background: COLORS.success, color: COLORS.white, fontWeight: 600, fontSize: 11 },
  logoutButton: { borderColor: "rgba(255,255,255,0.6)", color: COLORS.white },
}

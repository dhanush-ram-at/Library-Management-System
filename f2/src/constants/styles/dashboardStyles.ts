import { COLORS } from "./theme"

export const dashboardStyles = {
  pageWrapper: {
    background: COLORS.background,
    minHeight: "calc(100vh - 64px)",
    p: 3,
  },
  pageTitle:    { fontWeight: 700, color: COLORS.primary, mb: 2 },
  sectionTitle: { fontWeight: 700, color: COLORS.primary, mb: 1, mt: 4 },
  welcomeBanner: {
    p: 3, mb: 3, borderRadius: 2,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  welcomeTitle:    { fontWeight: 700, color: COLORS.primary },
  welcomeSubtitle: { color: COLORS.textSecondary, fontSize: 14, mt: 0.5 },
}

import { COLORS } from "./theme"

// shared between login and register pages
export const authStyles = {
  pageWrapper: {
    minHeight:      "100vh",
    background:     COLORS.background,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
  },
  card: {
    p:          4,
    width:      400,
    borderRadius: 3,
    boxShadow:  "0 2px 16px rgba(0,0,0,0.10)",
    background: COLORS.surface,
  },
  title: {
    textAlign:  "center",
    fontWeight: 700,
    color:      COLORS.primary,
    mb:         1,
  },
  subtitle: {
    textAlign: "center",
    color:     COLORS.textSecondary,
    mb:        3,
    fontSize:  14,
  },
  errorText: {
    color:    "error.main",
    fontSize: 13,
    mt:       1,
  },
  primaryButton: {
    mt:       3,
    py:       1.2,
    fontSize: 15,
  },
  secondaryButton: {
    py: 1.2,
  },
  divider: {
    my: 2,
  },
  dividerText: {
    fontSize: 12,
    color:    COLORS.textSecondary,
  },
  roleNote: {
    fontSize: 12,
    color:    COLORS.textSecondary,
    mt:       1,
  },
}

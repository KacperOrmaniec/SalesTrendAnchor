import { createTheme } from "@mui/material/styles";

const commonThemeSettings = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        },
        "*": {
          scrollbarWidth: "thin",
        },
        "*::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: "3px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
          fontSize: "0.875rem",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid",
          padding: "12px 16px",
        },
        head: {
          fontWeight: 600,
          fontSize: "0.875rem",
        },
      },
    },
  },
};

const lightTheme = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      light: "#3b82f6",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#7c3aed",
      light: "#8b5cf6",
      dark: "#6d28d9",
    },
    success: {
      main: "#059669",
      light: "#10b981",
      dark: "#047857",
    },
    warning: {
      main: "#d97706",
      light: "#f59e0b",
      dark: "#b45309",
    },
    error: {
      main: "#dc2626",
      light: "#ef4444",
      dark: "#b91c1c",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
    action: {
      hover: "#f1f5f9",
      selected: "#e0f2fe",
    },
  },
  components: {
    ...commonThemeSettings.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          ...commonThemeSettings.components.MuiPaper.styleOverrides.root,
          borderColor: "#e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonThemeSettings.components.MuiCard.styleOverrides.root,
          borderColor: "#e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          ...commonThemeSettings.components.MuiTableCell.styleOverrides.root,
          borderBottomColor: "#e2e8f0",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ...commonThemeSettings.components.MuiCssBaseline.styleOverrides,
        "*::-webkit-scrollbar-thumb": {
          ...commonThemeSettings.components.MuiCssBaseline.styleOverrides["*::-webkit-scrollbar-thumb"],
          backgroundColor: "#cbd5e1",
          "&:hover": {
            backgroundColor: "#94a3b8",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...commonThemeSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    divider: "#334155",
    action: {
      hover: "#334155",
      selected: "#1e40af",
    },
  },
  components: {
    ...commonThemeSettings.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          ...commonThemeSettings.components.MuiPaper.styleOverrides.root,
          borderColor: "#334155",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonThemeSettings.components.MuiCard.styleOverrides.root,
          borderColor: "#334155",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          ...commonThemeSettings.components.MuiTableCell.styleOverrides.root,
          borderBottomColor: "#334155",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ...commonThemeSettings.components.MuiCssBaseline.styleOverrides,
        "*::-webkit-scrollbar-thumb": {
          ...commonThemeSettings.components.MuiCssBaseline.styleOverrides["*::-webkit-scrollbar-thumb"],
          backgroundColor: "#475569",
          "&:hover": {
            backgroundColor: "#64748b",
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
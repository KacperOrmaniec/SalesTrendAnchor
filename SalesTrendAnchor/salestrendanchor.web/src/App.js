import "./App.css";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { NotificationProvider } from "./components/common/NotificationManager";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Analytics from "./components/pages/Analytics";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sidebarWidth = sidebarCollapsed ? 64 : 224;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NotificationProvider>
        <CssBaseline />
        <Router>
          <Sidebar
            collapsed={sidebarCollapsed}
            onCollapseChange={setSidebarCollapsed}
          />
          <Box
            sx={{
              display: "flex",
              minHeight: "100vh",
              ml: `${sidebarWidth}px`,
              transition: "margin-left 0.3s ease-in-out",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      isDarkMode={isDarkMode}
                      onThemeToggle={toggleTheme}
                    />
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <Analytics
                      isDarkMode={isDarkMode}
                      onThemeToggle={toggleTheme}
                    />
                  }
                />
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Box>
          </Box>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;

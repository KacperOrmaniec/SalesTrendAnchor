import "./App.css";
import SalesDataTable from "./components/features/SalesDataTable";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import TrendList from "./components/features/TrendList";
import { ThemeProvider, CssBaseline, Box, Container, Fade } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { NotificationProvider } from "./components/common/NotificationManager";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rows, setRows] = useState([]);
  const [trendCards, setTrendCards] = useState([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFileImported = (salesData, trendData) => {
    setRows(salesData);
    setTrendCards(trendData);
  };

  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NotificationProvider>
        <CssBaseline />
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapseChange={setSidebarCollapsed}
        />
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            ml: `${sidebarWidth}px`,
            transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            flexDirection: "column",
            bgcolor: "background.default",
          }}
        >
          <TopBar
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
          />
          
          <Container
            maxWidth="xl"
            sx={{
              flex: 1,
              py: { xs: 2, md: 4 },
              px: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: 2, md: 3 },
              alignItems: "flex-start",
            }}
          >
            <Fade in timeout={600}>
              <Box sx={{ flex: { lg: "1 1 55%" }, width: "100%" }}>
                <SalesDataTable
                  rows={rows}
                  onReset={() => {
                    setRows([]);
                    setTrendCards([]);
                  }}
                  onFileImported={handleFileImported}
                  onTrendsAnalyzed={setTrendCards}
                />
              </Box>
            </Fade>
            
            <Fade in timeout={800}>
              <Box sx={{ flex: { lg: "1 1 45%" }, width: "100%" }}>
                <TrendList trendCards={trendCards} />
              </Box>
            </Fade>
          </Container>
        </Box>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
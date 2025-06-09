import "./App.css";
import SalesDataTable from "./components/SalesDataTable";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TrendList from "./components/TrendList";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { NotificationProvider } from "./components/NotificationManager";

function createData(product, quantity, buyer, saleDate) {
  return { product, quantity, buyer, saleDate };
}

const rows = [
  createData("Laptop Lenovo ThinkPad", 3, "Anna Nowak", "2025-06-01"),
  createData('Monitor Dell 24"', 5, "Jan Kowalski", "2025-06-02"),
  createData("Mysz Logitech MX Master", 2, "Piotr Zieliński", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData(
    "Słuchawki Sony WH-1000XM4",
    4,
    "Tomasz Lewandowski",
    "2025-06-04"
  ),
];

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
          <Box sx={{ flexGrow: 0 }}>
            <TopBar
              isDarkMode={isDarkMode}
              onThemeToggle={toggleTheme}
              sx={{ ml: 0 }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Container
              maxWidth="xl"
              sx={{
                p: 3,
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 3,
                justifyContent: "center",
                alignItems: { xs: "stretch", lg: "flex-start" },
                transition: "padding 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{
                  flex: { lg: "1 1 60%" },
                  display: "flex",
                  justifyContent: "center",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <SalesDataTable rows={rows} />
              </Box>
              <Box
                sx={{
                  flex: { lg: "1 1 40%" },
                  display: "flex",
                  justifyContent: "center",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <TrendList />
              </Box>
            </Container>
          </Box>
        </Box>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;

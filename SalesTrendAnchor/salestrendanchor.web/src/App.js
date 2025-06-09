import "./App.css";
import SalesDataTable from "./components/SalesDataTable";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TrendList from "./components/TrendList";
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <TopBar />
          <Box sx={{ p: 3, display: 'flex', gap: 3 }}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                position: 'fixed', 
                top: '1rem', 
                right: '1rem',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'rotate(180deg)',
                }
              }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <SalesDataTable rows={rows} />
            <TrendList />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { useState } from "react";
import { Container, Box } from "@mui/material";
import SalesDataTable from "../features/SalesDataTable";
import TrendList from "../features/TrendList";
import TopBar from "../layout/TopBar";

function Dashboard({ isDarkMode, onThemeToggle }) {
  const [rows, setRows] = useState([]);
  const [trendCards, setTrendCards] = useState([]);

  const handleFileImported = (salesData, trendData) => {
    setRows(salesData);
    setTrendCards(trendData);
  };

  return (
    <>
      <TopBar
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        title="Dashboard"
      />
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
        <SalesDataTable
          rows={rows}
          onReset={() => {
            setRows([]);
            setTrendCards([]);
          }}
          onFileImported={handleFileImported}
          onTrendsAnalyzed={setTrendCards}
        />
        <Box
          sx={{
            flex: { lg: "1 1 40%" },
            display: "flex",
            justifyContent: "center",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <TrendList trendCards={trendCards} />
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;

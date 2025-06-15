import { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import TopBar from "../layout/TopBar";
import AnalyticsImportPrompt from "../features/AnalyticsImportPrompt";
import AnalyticsDataTable from "../features/AnalyticsDataTable";
import CloseIcon from "@mui/icons-material/Close";

function Analytics({ isDarkMode, onThemeToggle }) {
  const [analyticsData, setAnalyticsData] = useState(null);

  const handleFileImported = (data) => {
    setAnalyticsData(data);
  };

  const handleReset = () => {
    setAnalyticsData(null);
  };

  return (
    <>
      <TopBar
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        title="Analytics"
      />
      <Container maxWidth="xl" sx={{ p: 3 }}>
        {analyticsData ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Analytics Data
            </Typography>
            <AnalyticsDataTable data={analyticsData} />
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleReset}
              sx={{ mt: 2 }}
            >
              Reset Data
            </Button>
          </Box>
        ) : (
          <AnalyticsImportPrompt
            onFileImported={handleFileImported}
            onReset={handleReset}
          />
        )}
      </Container>
    </>
  );
}

export default Analytics;

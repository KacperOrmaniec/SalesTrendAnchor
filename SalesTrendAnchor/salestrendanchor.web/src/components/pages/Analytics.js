import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import TopBar from "../layout/TopBar";
import AnalyticsImportPrompt from "../features/AnalyticsImportPrompt";
import AnalyticsDataTable from "../features/AnalyticsDataTable";
import CloseIcon from "@mui/icons-material/Close";
import { getChurnPrediction } from "../../api/analyticsApi";
import { useNotification } from "../common/NotificationManager";

function Analytics({ isDarkMode, onThemeToggle }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [churnPredictionResults, setChurnPredictionResults] = useState(null);
  const [loadingChurn, setLoadingChurn] = useState(false);
  const { showNotification } = useNotification();

  const handleFileImported = (data) => {
    setAnalyticsData(data);
    setChurnPredictionResults(null); // Clear previous results when new data is imported
  };

  const handleReset = () => {
    setAnalyticsData(null);
    setChurnPredictionResults(null);
  };

  const handleChurnPrediction = async () => {
    if (!analyticsData) {
      showNotification("Please import data first.", "warning");
      return;
    }
    setLoadingChurn(true);
    try {
      const results = await getChurnPrediction(analyticsData);
      setChurnPredictionResults(results);
      showNotification("Churn prediction successful!", "success");
    } catch (error) {
      showNotification(`Error predicting churn: ${error.message}`, "error");
    } finally {
      setLoadingChurn(false);
    }
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
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChurnPrediction}
                disabled={loadingChurn}
              >
                {loadingChurn ? (
                  <CircularProgress size={24} />
                ) : (
                  "Predict Churn"
                )}
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleReset}
              >
                Reset Data
              </Button>
            </Box>

            {churnPredictionResults && (
              <Box sx={{ mt: 4, width: "100%" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Churn Prediction Results
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <pre>{JSON.stringify(churnPredictionResults, null, 2)}</pre>
                </Paper>
              </Box>
            )}
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

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Modal,
  IconButton,
} from "@mui/material";
import TopBar from "../layout/TopBar";
import AnalyticsImportPrompt from "../features/AnalyticsImportPrompt";
import AnalyticsDataTable from "../features/AnalyticsDataTable";
import CloseIcon from "@mui/icons-material/Close";
import { getChurnPrediction } from "../../api/analyticsApi";
import { useNotification } from "../common/NotificationManager";
import dayjs from "dayjs";
import ChurnResultList from "../features/ChurnResultList";

function getLast12Months() {
  const months = [];
  const now = dayjs();
  for (let i = 11; i >= 0; i--) {
    months.push(now.subtract(i, "month").format("YYYY-MM"));
  }
  return months;
}

function Analytics({ isDarkMode, onThemeToggle }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [churnPredictionResults, setChurnPredictionResults] = useState(null);
  const [loadingChurn, setLoadingChurn] = useState(false);
  const { showNotification } = useNotification();

  // Manual insert mode state
  const [manualInsertOpen, setManualInsertOpen] = useState(false);
  const [manualClients, setManualClients] = useState([]); // [{ client: '', months: { '2023-07': { turnover: 0, margin: 0 }, ... } }]
  const monthsList = getLast12Months();

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

  const handleAddClient = () => {
    const months = {};
    monthsList.forEach((m) => {
      months[m] = { turnover: 0, margin: 0 };
    });
    setManualClients([...manualClients, { client: "", months }]);
  };

  const handleRemoveClient = (idx) => {
    setManualClients(manualClients.filter((_, i) => i !== idx));
  };

  const handleClientNameChange = (idx, value) => {
    const updated = [...manualClients];
    updated[idx].client = value;
    setManualClients(updated);
  };

  const handleMonthValueChange = (clientIdx, month, field, value) => {
    const updated = [...manualClients];
    updated[clientIdx].months[month][field] = value;
    setManualClients(updated);
  };

  const handleManualSave = () => {
    // Transform to DTO format
    const data = manualClients.map((c) => ({
      Client: c.client,
      Months: Object.fromEntries(
        Object.entries(c.months).map(([month, vals]) => [
          month,
          {
            Turnover: Number(vals.turnover) || 0,
            Margin: Number(vals.margin) || 0,
          },
        ])
      ),
    }));
    setAnalyticsData(data);
    setManualInsertOpen(false);
    setChurnPredictionResults(null);
    showNotification("Manual data inserted!", "success");
  };

  return (
    <>
      <TopBar
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        title="Analytics"
      />
      <Container maxWidth="xl" sx={{ p: 3 }}>
        <Box
          sx={{ mb: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="outlined" onClick={() => setManualInsertOpen(true)}>
            Manual Insert
          </Button>
        </Box>
        {/* Manual Insert Modal */}
        <Modal
          open={manualInsertOpen}
          onClose={() => setManualInsertOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Manual Data Entry</Typography>
              <IconButton onClick={() => setManualInsertOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" onClick={handleAddClient}>
                Add Client
              </Button>
            </Box>
            {manualClients.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No clients added yet.
              </Typography>
            )}
            {manualClients.map((client, idx) => (
              <Paper key={idx} sx={{ mb: 3, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ mr: 2 }}>
                    Client {idx + 1}:
                  </Typography>
                  <input
                    type="text"
                    placeholder="Client name"
                    value={client.client}
                    onChange={(e) =>
                      handleClientNameChange(idx, e.target.value)
                    }
                    style={{
                      padding: 6,
                      fontSize: 16,
                      flex: 1,
                      marginRight: 8,
                      color: isDarkMode ? "#fff" : "#000",
                      backgroundColor: isDarkMode ? "#222" : "#fff",
                      border: "1px solid #555",
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveClient(idx)}
                    size="small"
                    color="error"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: 4 }}>Month</th>
                        <th style={{ textAlign: "left", padding: 4 }}>
                          Turnover
                        </th>
                        <th style={{ textAlign: "left", padding: 4 }}>
                          Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthsList.map((month) => (
                        <tr key={month}>
                          <td style={{ padding: 4 }}>{month}</td>
                          <td style={{ padding: 4 }}>
                            <input
                              type="number"
                              min="0"
                              value={client.months[month].turnover}
                              onChange={(e) =>
                                handleMonthValueChange(
                                  idx,
                                  month,
                                  "turnover",
                                  e.target.value
                                )
                              }
                              style={{
                                width: 90,
                                color: isDarkMode ? "#fff" : "#000",
                                backgroundColor: isDarkMode ? "#222" : "#fff",
                                border: "1px solid #555",
                                borderRadius: 4,
                              }}
                            />
                          </td>
                          <td style={{ padding: 4 }}>
                            <input
                              type="number"
                              min="0"
                              value={client.months[month].margin}
                              onChange={(e) =>
                                handleMonthValueChange(
                                  idx,
                                  month,
                                  "margin",
                                  e.target.value
                                )
                              }
                              style={{
                                width: 90,
                                color: isDarkMode ? "#fff" : "#000",
                                backgroundColor: isDarkMode ? "#222" : "#fff",
                                border: "1px solid #555",
                                borderRadius: 4,
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Paper>
            ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleManualSave}
                disabled={
                  manualClients.length === 0 ||
                  manualClients.some((c) => !c.client)
                }
              >
                Save Data
              </Button>
            </Box>
          </Box>
        </Modal>
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
                <ChurnResultList results={churnPredictionResults} />
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

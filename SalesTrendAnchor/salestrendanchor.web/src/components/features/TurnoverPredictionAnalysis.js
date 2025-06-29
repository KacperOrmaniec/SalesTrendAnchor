import React, { useState } from "react";
import {
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { getTurnoverPrediction } from "../../api/analyticsApi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";

function TurnoverPredictionAnalysis({ salesData }) {
  const [predictionData, setPredictionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTurnoverPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTurnoverPrediction(salesData);
      setPredictionData(response);
    } catch (err) {
      setError(err.message || "Failed to fetch turnover prediction.");
      setPredictionData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        onClick={fetchTurnoverPrediction}
        disabled={loading}
        sx={{ minWidth: 220 }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          "Analyze Turnover Prediction"
        )}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {predictionData && predictionData.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            maxHeight: 600,
            overflowY: "auto",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Turnover Prediction Results
          </Typography>
          <List disablePadding>
            {predictionData.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  bgcolor: "background.default",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  transition:
                    "background-color 0.3s, box-shadow 0.3s, transform 0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                    boxShadow: 4,
                    transform: "translateY(-2px) scale(1.01)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", flex: 1 }}
                  >
                    <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    {item.client}
                  </Typography>
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={`Predicted: ${item.predictedNextMonthTurnover}`}
                    color="primary"
                    size="small"
                  />
                </Stack>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

TurnoverPredictionAnalysis.propTypes = {
  salesData: PropTypes.array.isRequired,
};

export default TurnoverPredictionAnalysis;

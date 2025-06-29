import React, { useState } from "react";
import {
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { getOverallTurnoverPrediction } from "../../api/analyticsApi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function OverallTurnoverPredictionAnalysis({ salesData }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOverallTurnoverPrediction(salesData);
      setPrediction(response);
    } catch (err) {
      setError(err.message || "Failed to fetch overall turnover prediction.");
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        onClick={fetchPrediction}
        disabled={loading}
        sx={{ minWidth: 220 }}
      >
        {loading ? <CircularProgress size={24} /> : "Analyze Overall Turnover"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {prediction && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            maxWidth: 400,
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Overall Turnover Prediction Result
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Chip
              icon={<TrendingUpIcon />}
              label={`Predicted Next Month: ${prediction.predictedOverallNextMonthTurnover}`}
              color="primary"
              size="medium"
            />
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

OverallTurnoverPredictionAnalysis.propTypes = {
  salesData: PropTypes.array.isRequired,
};

export default OverallTurnoverPredictionAnalysis;

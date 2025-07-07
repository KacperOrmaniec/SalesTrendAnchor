import React, { useState } from "react";
import {
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Stack,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { getTrendAnalysis } from "../../api/analyticsApi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import PersonIcon from "@mui/icons-material/Person";

function getTrendIcon(trend) {
  if (trend === "Increasing")
    return <TrendingUpIcon color="success" fontSize="small" />;
  if (trend === "Decreasing")
    return <TrendingDownIcon color="error" fontSize="small" />;
  return <TrendingFlatIcon color="info" fontSize="small" />;
}

function TrendAnalysis({ salesData }) {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTrendAnalysis(salesData);
      setTrendData(response);
    } catch (err) {
      setError(err.message || "Failed to fetch trend analysis.");
      setTrendData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        onClick={fetchTrendAnalysis}
        disabled={loading}
        sx={{ minWidth: 220 }}
      >
        {loading ? <CircularProgress size={24} /> : "Analyze Trends"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {trendData && trendData.length > 0 && (
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
            Trend Analysis Results
          </Typography>
          <List disablePadding>
            {trendData.map((client, idx) => (
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
                    {client.client}
                  </Typography>
                </Stack>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Turnover Trend</TableCell>
                        <TableCell align="right">Turnover %</TableCell>
                        <TableCell>Margin Trend</TableCell>
                        <TableCell align="right">Margin %</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {client.monthlyTrends.map((trend, tIdx) => (
                        <TableRow key={tIdx}>
                          <TableCell>{trend.month}</TableCell>
                          <TableCell>
                            {getTrendIcon(trend.turnoverTrend)}{" "}
                            {trend.turnoverTrend}
                          </TableCell>
                          <TableCell align="right">
                            {trend.turnoverChangePercentage.toFixed(2)}%
                          </TableCell>
                          <TableCell>
                            {getTrendIcon(trend.marginTrend)}{" "}
                            {trend.marginTrend}
                          </TableCell>
                          <TableCell align="right">
                            {trend.marginChangePercentage.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

TrendAnalysis.propTypes = {
  salesData: PropTypes.array.isRequired,
};

export default TrendAnalysis;

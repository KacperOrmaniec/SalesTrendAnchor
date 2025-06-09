import Paper from "@mui/material/Paper";
import TrendCard from "./TrendCard";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { fetchSaleTrends } from "../services/api";
import { CircularProgress, Alert } from "@mui/material";

function getTrendStatus(trend) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextBuyDate = new Date(trend.NextBuyDate);
  nextBuyDate.setHours(0, 0, 0, 0);
  if (nextBuyDate < today) return 0; // overdue (red)
  if (nextBuyDate.getTime() === today.getTime()) return 1; // today (yellow)
  return 2; // upcoming (green)
}

function TrendList() {
  const theme = useTheme();
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const data = await fetchSaleTrends();
        setTrends(data);
        setError(null);
      } catch (err) {
        setError("Failed to load trends. Please try again later.");
        console.error("Error loading trends:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrends();
  }, []);

  // Sort: overdue (0), today (1), upcoming (2), then by date ascending
  const sortedTrends = [...trends].sort((a, b) => {
    const statusA = getTrendStatus(a);
    const statusB = getTrendStatus(b);
    if (statusA !== statusB) return statusA - statusB;
    // If same status, sort by date ascending
    const dateA = new Date(a.NextBuyDate);
    const dateB = new Date(b.NextBuyDate);
    return dateA - dateB;
  });

  if (loading) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: 820,
        overflowY: "auto",
        minWidth: 320,
        transition:
          "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.background.paper,
          transition: "background-color 0.3s ease-in-out",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.divider,
          borderRadius: "4px",
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
    >
      {sortedTrends.map((trend) => (
        <TrendCard key={trend.Id} trend={trend} />
      ))}
    </Paper>
  );
}

export default TrendList;

import Paper from "@mui/material/Paper";
import TrendCard from "./TrendCard";
import { useTheme } from "@mui/material/styles";
import { Alert } from "@mui/material";

function getTrendStatus(trend) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextBuyDate = new Date(trend.nextBuyDate);
  nextBuyDate.setHours(0, 0, 0, 0);
  if (nextBuyDate < today) return 0; // overdue (red)
  if (nextBuyDate.getTime() === today.getTime()) return 1; // today (yellow)
  return 2; // upcoming (green)
}

function TrendList({ trendCards }) {
  const theme = useTheme();

  // Sort: overdue (0), today (1), upcoming (2), then by date ascending
  const sortedTrends = [...trendCards].sort((a, b) => {
    const statusA = getTrendStatus(a);
    const statusB = getTrendStatus(b);
    if (statusA !== statusB) return statusA - statusB;
    // If same status, sort by date ascending
    const dateA = new Date(a.nextBuyDate);
    const dateB = new Date(b.nextBuyDate);
    return dateA - dateB;
  });

  if (!trendCards || trendCards.length === 0) {
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
        <Alert severity="info" sx={{ width: "100%" }}>
          There are no sales trends to display right now.
          <br />
          Upload sales data to see trends!
        </Alert>
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
        <TrendCard key={trend.id} trend={trend} />
      ))}
    </Paper>
  );
}

export default TrendList;

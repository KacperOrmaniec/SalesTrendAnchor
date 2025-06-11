import React from "react";
import { Card, CardContent, Typography, Box, Alert, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TrendCard from "./TrendCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
      <Card>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <TrendingUpIcon 
            sx={{ 
              fontSize: 64, 
              color: "text.secondary", 
              mb: 2,
              opacity: 0.5,
            }} 
          />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            No Trends Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload sales data to discover purchasing patterns and trends
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Sales Trends
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {sortedTrends.length} trend{sortedTrends.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>
        
        <Stack 
          spacing={2}
          sx={{
            maxHeight: 600,
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.divider,
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }}
        >
          {sortedTrends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TrendList;
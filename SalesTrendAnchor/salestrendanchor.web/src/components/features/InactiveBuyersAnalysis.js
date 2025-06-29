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
import { getInactiveBuyers } from "../../api/analyticsApi";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function InactiveBuyersAnalysis({ salesData }) {
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInactiveBuyers = async (numberOfRecentMonths = 3) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInactiveBuyers(salesData, numberOfRecentMonths);
      setInactiveData(response);
    } catch (err) {
      setError(err.message || "Failed to fetch inactive buyers.");
      setInactiveData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisClick = () => {
    fetchInactiveBuyers();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        onClick={handleAnalysisClick}
        disabled={loading}
        sx={{ minWidth: 220 }}
      >
        {loading ? <CircularProgress size={24} /> : "Analyze Inactive Buyers"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {inactiveData && inactiveData.length > 0 && (
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
            Inactive Buyers Results
          </Typography>
          <List disablePadding>
            {inactiveData.map((item, idx) => (
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
                    <PersonOffIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    {item.client}
                  </Typography>
                  <Chip
                    icon={<CalendarMonthIcon />}
                    label={`Inactive: ${item.inactiveMonths.length} month(s)`}
                    color="warning"
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Inactive months: {item.inactiveMonths.join(", ")}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<CalendarMonthIcon />}
                    label={
                      item.lastActiveMonth
                        ? `Last Active: ${item.lastActiveMonth}`
                        : "No recent activity"
                    }
                    color={item.lastActiveMonth ? "info" : "default"}
                    size="small"
                    clickable={false}
                  />
                  <Chip
                    icon={<MonetizationOnIcon />}
                    label={`Last Turnover: ${item.lastActiveTurnover}`}
                    color={item.lastActiveTurnover > 0 ? "success" : "default"}
                    size="small"
                    clickable={false}
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

InactiveBuyersAnalysis.propTypes = {
  salesData: PropTypes.array.isRequired,
};

export default InactiveBuyersAnalysis;

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Collapse, 
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";

function TrendCard({ trend }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  // Parse dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextBuyDate = new Date(trend.nextBuyDate);
  nextBuyDate.setHours(0, 0, 0, 0);

  let statusColor, statusLabel, statusIcon;
  if (nextBuyDate > today) {
    statusColor = "success";
    statusLabel = "Upcoming";
    statusIcon = <ScheduleIcon sx={{ fontSize: 16 }} />;
  } else if (nextBuyDate.getTime() === today.getTime()) {
    statusColor = "warning";
    statusLabel = "Due Today";
    statusIcon = <TrendingUpIcon sx={{ fontSize: 16 }} />;
  } else {
    statusColor = "error";
    statusLabel = "Overdue";
    statusIcon = <TrendingUpIcon sx={{ fontSize: 16 }} />;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
        },
        position: "relative",
        overflow: "visible",
      }}
      onClick={handleExpandClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Chip
            icon={statusIcon}
            label={statusLabel}
            color={statusColor}
            size="small"
            sx={{ fontWeight: 500 }}
          />
          <IconButton
            size="small"
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          {trend.product}
        </Typography>

        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {trend.buyer}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Expected: {formatDate(trend.nextBuyDate)}
            </Typography>
          </Box>
        </Stack>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Last Sale
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatDate(trend.lastSaleDate)}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Predicted Quantity
                </Typography>
                <Chip 
                  label={trend.predictedQuantity.toFixed(1)}
                  size="small"
                  variant="outlined"
                  icon={<InventoryIcon sx={{ fontSize: 14 }} />}
                />
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Confidence Score
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 6,
                      bgcolor: "grey.200",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${trend.confidenceScore}%`,
                        height: "100%",
                        bgcolor: trend.confidenceScore > 70 ? "success.main" : 
                                trend.confidenceScore > 40 ? "warning.main" : "error.main",
                        transition: "width 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 35 }}>
                    {trend.confidenceScore.toFixed(0)}%
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default TrendCard;
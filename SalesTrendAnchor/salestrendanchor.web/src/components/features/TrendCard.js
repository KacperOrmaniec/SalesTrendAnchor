import Paper from "@mui/material/Paper";
import { Typography, Box, IconButton, Collapse } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function TrendCard({ trend }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Parse dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextBuyDate = new Date(trend.nextBuyDate);
  nextBuyDate.setHours(0, 0, 0, 0);

  let bgColor, statusTitle;
  if (nextBuyDate > today) {
    bgColor = theme.palette.success.main;
    statusTitle = "Upcoming sale";
  } else if (nextBuyDate.getTime() === today.getTime()) {
    bgColor = theme.palette.warning.main;
    statusTitle = "Sale should happen today";
  } else {
    bgColor = theme.palette.error.main;
    statusTitle = "Sale is overdue";
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      elevation={isHovered ? 4 : 2}
      sx={{
        flexShrink: 0,
        minWidth: 280,
        minHeight: 120,
        p: 2,
        mb: 2,
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: theme.shadows[4],
          transform: "translateY(-2px)",
        },
        position: "relative",
        overflow: "hidden",
        backgroundColor: bgColor,
        color: "#fff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleExpandClick}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          transition: "color 0.3s ease-in-out",
        }}
      >
        {statusTitle}
      </Typography>
      <Box>
        <Box>
          <Typography
            component="span"
            sx={{
              fontWeight: "medium",
              transition: "color 0.3s ease-in-out",
            }}
          >
            Expected next buy:
          </Typography>{" "}
          <Typography
            component="span"
            sx={{ transition: "color 0.3s ease-in-out" }}
          >
            {new Date(trend.nextBuyDate).toLocaleDateString()}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              fontWeight: "medium",
              transition: "color 0.3s ease-in-out",
            }}
          >
            Product:
          </Typography>{" "}
          <Typography
            component="span"
            sx={{ transition: "color 0.3s ease-in-out" }}
          >
            {trend.product}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              fontWeight: "medium",
              transition: "color 0.3s ease-in-out",
            }}
          >
            Buyer:
          </Typography>{" "}
          <Typography
            component="span"
            sx={{ transition: "color 0.3s ease-in-out" }}
          >
            {trend.buyer}
          </Typography>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}
        >
          <Typography variant="body2" color="text.secondary">
            Last sale: {new Date(trend.lastSaleDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Predicted quantity: {trend.predictedQuantity.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Confidence score: {trend.confidenceScore.toFixed(1)}%
          </Typography>
        </Box>
      </Collapse>
      <IconButton
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          transition: "transform 0.3s ease-in-out",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Paper>
  );
}

export default TrendCard;

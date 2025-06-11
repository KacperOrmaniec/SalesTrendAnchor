import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function TopBar({ isDarkMode, onThemeToggle }) {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TrendingUpIcon 
            sx={{ 
              color: "primary.main", 
              fontSize: 28,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }} 
          />
          <Typography 
            variant="h6" 
            color="text.primary"
            sx={{ 
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            Sales Trend Anchor
          </Typography>
        </Box>
        
        <IconButton
          onClick={onThemeToggle}
          color="inherit"
          sx={{
            transition: "all 0.3s ease-in-out",
            color: "text.secondary",
            "&:hover": {
              transform: "rotate(180deg)",
              backgroundColor: "action.hover",
              color: "primary.main",
            },
          }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
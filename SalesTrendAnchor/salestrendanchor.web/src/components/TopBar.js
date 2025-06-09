import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function TopBar({ isDarkMode, onThemeToggle }) {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="text.primary">
          Dashboard
        </Typography>
        <IconButton 
          onClick={onThemeToggle} 
          color="inherit"
          sx={{ 
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'rotate(180deg)',
            }
          }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

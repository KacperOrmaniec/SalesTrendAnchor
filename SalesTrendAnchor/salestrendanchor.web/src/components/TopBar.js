import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function TopBar() {
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
      <Toolbar>
        <Typography variant="h6" color="text.primary">
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

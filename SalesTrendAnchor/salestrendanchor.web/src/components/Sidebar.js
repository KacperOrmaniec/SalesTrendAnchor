import React from "react";
import { Avatar, Button, Box, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Sidebar() {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        width: 224,
        height: '100vh',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: 'background-color 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        width: '100%',
        px: 2,
        mt: 2
      }}>
        <Avatar>KO</Avatar>
        <Box sx={{ color: 'text.primary' }}>logo</Box>
      </Box>
      <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
        Dashboard
      </Button>
      <Button 
        variant="outlined" 
        color="error"
        fullWidth
        sx={{ mt: 'auto', mb: 2 }}
      >
        Logout
      </Button>
    </Paper>
  );
}

export default Sidebar;

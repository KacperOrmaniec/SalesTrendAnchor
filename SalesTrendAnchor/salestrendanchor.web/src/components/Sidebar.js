import React, { useState, useEffect } from "react";
import { 
  Avatar, 
  Button, 
  Box, 
  Paper, 
  Tooltip, 
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const EXPANDED_WIDTH = 224;
const COLLAPSED_WIDTH = 64;
const TEXT_SHOW_WIDTH = 100; // px

function Sidebar({ collapsed, onCollapseChange }) {
  const theme = useTheme();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarWidth, setSidebarWidth] = useState(collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH);

  useEffect(() => {
    setSidebarWidth(collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH);
  }, [collapsed]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(collapsed);
    // eslint-disable-next-line
  }, [collapsed]);

  return (
    <Paper
      elevation={0}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1201,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Avatar sx={{ 
          transition: 'all 0.3s ease-in-out',
          width: collapsed ? 32 : 40,
          height: collapsed ? 32 : 40,
        }}>KO</Avatar>
        <Box sx={{ 
          color: 'text.primary',
          transition: 'opacity 0.3s ease-in-out, width 0.3s cubic-bezier(0.4,0,0.2,1)',
          opacity: collapsed ? 0 : 1,
          width: collapsed ? 0 : 'auto',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }} aria-hidden={collapsed}>
          logo
        </Box>
      </Box>

      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <Tooltip 
            key={item.id}
            title={collapsed ? item.label : ''}
            placement="right"
          >
            <ListItem
              button
              onClick={() => handleItemClick(item.id)}
              sx={{
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
                px: 2.5,
                backgroundColor: activeItem === item.id ? theme.palette.action.selected : 'transparent',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 'auto' : 3,
                  justifyContent: 'center',
                  color: activeItem === item.id ? 'primary.main' : 'inherit',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{ 
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : 'auto',
                  transition: 'opacity 0.3s ease-in-out, width 0.3s cubic-bezier(0.4,0,0.2,1)',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                aria-hidden={collapsed}
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={!collapsed && <LogoutIcon />}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              minWidth: collapsed ? 'auto' : '100%',
              px: collapsed ? 1 : 2,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <span style={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : 'auto',
              transition: 'opacity 0.3s ease-in-out, width 0.3s cubic-bezier(0.4,0,0.2,1)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
            aria-hidden={collapsed}
            >Logout</span>
          </Button>
        </Tooltip>
      </Box>

      <IconButton
        onClick={() => onCollapseChange && onCollapseChange(!collapsed)}
        sx={{
          position: 'absolute',
          right: -12,
          top: '50%',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Paper>
  );
}

export default Sidebar;

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
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate, useLocation } from "react-router-dom";

const EXPANDED_WIDTH = 224;
const COLLAPSED_WIDTH = 64;
const TEXT_CONTAINER_WIDTH = 120; // px

function Sidebar({ collapsed, onCollapseChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(
    collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
  );

  useEffect(() => {
    setSidebarWidth(collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH);
  }, [collapsed]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  const handleItemClick = (itemId, path) => {
    navigate(path);
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
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1201,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            transition: "all 0.3s ease-in-out",
            width: collapsed ? 32 : 40,
            height: collapsed ? 32 : 40,
          }}
        >
          KO
        </Avatar>
        <Box
          sx={{
            color: "text.primary",
            transition: "opacity 0.3s ease-in-out",
            opacity: collapsed ? 0 : 1,
            width: `${TEXT_CONTAINER_WIDTH}px`,
            overflow: "hidden",
            whiteSpace: "nowrap",
            ml: 1,
            display: "inline-block",
          }}
          aria-hidden={collapsed}
        >
          logo
        </Box>
      </Box>

      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.id}
            title={collapsed ? item.label : ""}
            placement="right"
          >
            <ListItem
              button={true}
              onClick={() => handleItemClick(item.id, item.path)}
              sx={{
                minHeight: 48,
                justifyContent: collapsed ? "center" : "initial",
                px: 2.5,
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.action.selected
                    : "transparent",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? "auto" : 3,
                  justifyContent: "center",
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Box
                sx={{
                  opacity: collapsed ? 0 : 1,
                  width: `${TEXT_CONTAINER_WIDTH}px`,
                  transition: "opacity 0.3s ease-in-out",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
                aria-hidden={collapsed}
              >
                {item.label}
              </Box>
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
              justifyContent: collapsed ? "center" : "flex-start",
              minWidth: collapsed ? "auto" : "100%",
              px: collapsed ? 1 : 2,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <span
              style={{
                opacity: collapsed ? 0 : 1,
                width: `${TEXT_CONTAINER_WIDTH}px`,
                transition: "opacity 0.3s ease-in-out",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "inline-block",
                marginLeft: 8,
              }}
              aria-hidden={collapsed}
            >
              Logout
            </span>
          </Button>
        </Tooltip>
      </Box>

      <IconButton
        onClick={() => onCollapseChange && onCollapseChange(!collapsed)}
        sx={{
          position: "absolute",
          right: -12,
          top: "50%",
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Paper>
  );
}

export default Sidebar;

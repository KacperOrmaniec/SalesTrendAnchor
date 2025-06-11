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
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

function Sidebar({ collapsed, onCollapseChange }) {
  const theme = useTheme();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarWidth, setSidebarWidth] = useState(
    collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
  );

  useEffect(() => {
    setSidebarWidth(collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH);
  }, [collapsed]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
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
          gap: 1.5,
          p: 2.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            transition: "all 0.3s ease-in-out",
            width: collapsed ? 32 : 40,
            height: collapsed ? 32 : 40,
            bgcolor: "primary.main",
            fontSize: collapsed ? "0.875rem" : "1rem",
            fontWeight: 600,
          }}
        >
          SA
        </Avatar>
        {!collapsed && (
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                fontSize: "0.875rem",
                lineHeight: 1.2,
              }}
            >
              Sales Anchor
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              Trend Analysis
            </Typography>
          </Box>
        )}
      </Box>

      <List sx={{ flexGrow: 1, pt: 2, px: 1 }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.id}
            title={collapsed ? item.label : ""}
            placement="right"
          >
            <ListItem
              button
              onClick={() => handleItemClick(item.id)}
              sx={{
                minHeight: 44,
                justifyContent: collapsed ? "center" : "initial",
                px: 2,
                mx: 0.5,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor:
                  activeItem === item.id
                    ? theme.palette.primary.main
                    : "transparent",
                color: activeItem === item.id ? "#fff" : "text.primary",
                "&:hover": {
                  backgroundColor:
                    activeItem === item.id
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover,
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? "auto" : 2,
                  justifyContent: "center",
                  color: "inherit",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ mx: 1 }} />

      <Box sx={{ p: 2 }}>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={!collapsed ? <LogoutIcon /> : null}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              minWidth: collapsed ? 40 : "100%",
              height: 40,
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {collapsed ? <LogoutIcon /> : "Logout"}
          </Button>
        </Tooltip>
      </Box>

      <IconButton
        onClick={() => onCollapseChange && onCollapseChange(!collapsed)}
        sx={{
          position: "absolute",
          right: -16,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          width: 32,
          height: 32,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          transition: "all 0.3s ease-in-out",
          boxShadow: theme.shadows[2],
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Paper>
  );
}

export default Sidebar;
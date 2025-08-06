import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TemplateIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (path === "/") return null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDownloadClick = () => {
    try {
      const slugList = JSON.parse(localStorage.getItem("slug") || "[]");
      let markdownContent = "";

      for (let i = 0; i < slugList.length; i++) {
        const slug = slugList[i];
        markdownContent = markdownContent + slug.markdown;
      }

      const blob = new Blob([markdownContent], { type: "text/markdown" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "README.md";
      link.click();
    } catch (error) {
      console.error("Error downloading markdown:", error);
    }
    setMobileOpen(false);
  };

  const handleNavigation = (route) => {
    window.location.href = route;
    setMobileOpen(false);
  };

  const navigationItems = [
    { text: "Home", icon: <HomeIcon />, path: "/", route: "/" },
    { text: "Templates", icon: <TemplateIcon />, path: "/templates", route: "/templates" },
    { text: "Editor", icon: <EditIcon />, path: "/editor", route: "/editor" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <img src="/logo.png" width={40} height={40} alt="Logo" />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.route)}
              selected={path === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(84, 116, 249, 0.1)',
                  '& .MuiListItemIcon-root': {
                    color: '#5474f9',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#5474f9',
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: path === item.path ? '#5474f9' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontWeight: path === item.path ? 'bold' : 'normal',
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {path === "/editor" && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleDownloadClick}>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Download" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#333",
          color: "#ffffff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography variant="h6" component="div">
              <img 
                src="/logo.png" 
                width={isMobile ? 40 : 60} 
                height={isMobile ? 40 : 60} 
                alt="Logo" 
              />
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => handleNavigation(item.route)}
                  sx={{ fontWeight: path === item.path ? "bold" : "normal" }}
                >
                  {item.text}
                </Button>
              ))}

              {path === "/editor" && (
                <Button
                  variant="contained"
                  onClick={handleDownloadClick}
                  sx={{
                    ml: 2,
                    backgroundColor: "#5474f9",
                    "&:hover": { backgroundColor: "#3b5fda" },
                  }}
                >
                  Download
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Navigation Icons */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {path === "/editor" && (
                <IconButton
                  color="inherit"
                  onClick={handleDownloadClick}
                  sx={{ 
                    backgroundColor: "#5474f9",
                    "&:hover": { backgroundColor: "#3b5fda" },
                    mr: 1
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

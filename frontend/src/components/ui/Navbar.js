import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadIcon from "@mui/icons-material/Download";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import { Menu } from "./Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar({ onDownload }) {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (path === "/") return null;

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
  };

  const handleNavigation = (route) => {
    window.location.href = route;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#333",
          color: "#ffffff",
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src="/logo.png"
              width={60}
              height={60}
              alt="Logo"
              onClick={() => handleNavigation("/")}
            />
          </Typography>

          {/* Show Templates icon except on /templates */}
          {path !== "/templates" && (
            <Tooltip title="Templates">
              <IconButton
                color="inherit"
                onClick={() => handleNavigation("/templates")}
              >
                <DescriptionIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Show Editor icon except on /editor */}
          {path !== "/editor" && (
            <Tooltip title="Editor">
              <IconButton
                color="inherit"
                onClick={() => handleNavigation("/editor")}
              >
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Editor page specific icons */}
          {path === "/editor" && (
            <>
              <Tooltip title="Download README">
                <IconButton
                  color="inherit"
                  onClick={onDownload || handleDownloadClick}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              {/* Hamburger menu for mobile */}
              {isMobile && (
                <>
                  <Tooltip title="Sections & AI">
                    <IconButton
                      color="inherit"
                      onClick={() => setDrawerOpen(true)}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                  <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                      sx: { width: { xs: "90vw", sm: 350 }, p: 2 },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Menu />
                  </Drawer>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

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
            <img src="/logo.png" width={60} height={60} alt="Logo" />
          </Typography>

          <Button
            color="inherit"
            onClick={() => handleNavigation("/")}
            sx={{ fontWeight: path === "/" ? "bold" : "normal" }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            onClick={() => handleNavigation("/templates")}
            sx={{ fontWeight: path === "/templates" ? "bold" : "normal" }}
          >
            Templates
          </Button>

          <Button
            color="inherit"
            onClick={() => handleNavigation("/editor")}
            sx={{ fontWeight: path === "/editor" ? "bold" : "normal" }}
          >
            Editor
          </Button>

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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

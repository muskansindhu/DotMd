import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
  const url = window.location.href;
  const path = url.split("/").pop();
  const handleActiveLink = () => {
    if (path === "markdown-editor") {
      console.log("this is markdown page");
    } else if (path === "templates") {
      console.log("this is templates page");
    }
  };

  useEffect(() => {
    handleActiveLink();
  }, []);

  useEffect(() => {
    handleActiveLink();
  }, [path]);

  const handleDownloadClick = () => {
    const slugList = JSON.parse(localStorage.getItem("slug"));
    console.log(slugList);
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
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="/logo.png" width={60} height={60} alt="" />
          </Typography>
          {path === "markdown-editor" && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDownloadClick}
            >
              Download
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Navbar };

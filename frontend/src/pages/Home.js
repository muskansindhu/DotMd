import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#5474f9" },
    secondary: { main: "#98bae7" },
    background: { default: "#c4ebe4" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const Home = () => {
  const navigate = useNavigate();

  const handleExploreTemplatesClick = () => {
    navigate("/templates");
  };

  const handleTryEditorClick = () => {
    navigate("/markdown-editor");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "2rem",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "120px",
            backgroundImage: "url('/dotmd(2).png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "500px",
            height: "190px",
            backgroundImage: "url('/dotmd(2).png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#000000",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Welcome to .md - Your Markdown Creation Tool
        </Typography>
        <Box sx={{ maxWidth: "80vw", textAlign: "center" }}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: "#808080",
              marginBottom: "1rem",
              lineHeight: 1.6,
            }}
          >
            Easily create markdown files with .md! Use predefined sections,
            customize your own, or explore top GitHub templates. Start now and
            unlock endless possibilities!
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#b9d2f9",
              "&:hover": {
                backgroundColor: "#88a9d4",
              },
            }}
            onClick={handleExploreTemplatesClick}
          >
            Explore Templates
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#b9d2f9",
              "&:hover": {
                backgroundColor: "#88a9d4",
              },
            }}
            onClick={handleTryEditorClick}
          >
            Try Online Editor
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;

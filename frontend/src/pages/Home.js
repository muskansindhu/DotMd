import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const theme = createTheme({
  palette: {
    primary: { main: "#6C63FF" },
    secondary: { main: "#FFFFFF" },
    background: {
      default: "#f9fafe",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

const dotPattern = `radial-gradient(circle, rgba(108,99,255,0.2) 1px, transparent 1px)`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          backgroundColor: theme.palette.background.default,
          backgroundImage: dotPattern,
          backgroundSize: "20px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            left: "100px",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "70px", width: "auto", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            right: "100px",
            cursor: "pointer",
            color: "#1a1a1a",
            "&:hover": { color: "#5474f9" },
          }}
          onClick={() =>
            window.open(
              "https://github.com/muskansindhu/Markdown-Editor",
              "_blank"
            )
          }
        >
          <FaGithub size={45} />
        </Box>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#1a1a1a",
              mb: 2,
            }}
          >
            Create beautiful{" "}
            <Box component="span" sx={{ color: "#5474f9" }}>
              README
            </Box>{" "}
            files in seconds
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#555",
              mb: 4,
            }}
          >
            Markdown made simple. Drag sections, edit content, and preview live
            — all in one place.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#5474f9",
                color: "white",
                px: 4,
                "&:hover": {
                  backgroundColor: "#3b5fda",
                },
              }}
              onClick={() => navigate("/markdown-editor")}
            >
              Try the Editor
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#5474f9",
                color: "#5474f9",
                px: 4,
                "&:hover": {
                  backgroundColor: "#f0f0ff",
                },
              }}
              onClick={() => navigate("/templates")}
            >
              Explore Templates
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;

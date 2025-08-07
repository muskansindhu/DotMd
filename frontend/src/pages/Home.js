import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
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
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: theme.palette.background.default,
          backgroundImage: dotPattern,
          backgroundSize: "20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflowX: "hidden",
          pt: { xs: 6, sm: 12 },
          pb: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "20px", sm: "40px" },
            left: { xs: "16px", sm: "100px" },
            zIndex: 2,
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: isMobile ? "48px" : "70px",
              width: "auto",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        </Box>

        {/* GitHub Icon */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "28px", sm: "50px" },
            right: { xs: "16px", sm: "100px" },
            cursor: "pointer",
            color: "#1a1a1a",
            "&:hover": { color: "#5474f9" },
            zIndex: 2,
          }}
          onClick={() =>
            window.open(
              "https://github.com/muskansindhu/Markdown-Editor",
              "_blank"
            )
          }
        >
          <FaGithub size={isMobile ? 32 : 45} />
        </Box>

        {/* Main Text */}
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            mt: { xs: 7, sm: 0 },
            px: { xs: 1, sm: 3 },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            color="#1a1a1a"
            mb={2}
            sx={{
              fontSize: { xs: "2rem", sm: "3rem" },
              lineHeight: { xs: 1.2, sm: 1.15 },
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
            color="#555"
            mb={4}
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              lineHeight: 1.4,
            }}
          >
            Markdown made simple. Drag sections, edit content, and preview live
            — all in one place.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 6,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#5474f9",
                color: "white",
                px: 4,
                width: { xs: "100%", sm: "auto" },
                mb: { xs: 1, sm: 0 },
                "&:hover": {
                  backgroundColor: "#3b5fda",
                },
              }}
              onClick={() => navigate("/editor")}
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
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  backgroundColor: "#f0f0ff",
                },
              }}
              onClick={() => navigate("/templates")}
            >
              Explore Templates
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
            <img
              src="/homepage-preview.png"
              alt="Editor Screenshot"
              style={{
                maxWidth: "100%",
                width: isMobile ? "100%" : "700px",
                borderRadius: "12px",
                boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
        </Container>
        <Box
          sx={{
            width: "100%",
            py: 2,
            textAlign: "center",
            borderTop: "1px solid #ddd",
            backgroundColor: "#333",
            mt: "auto",
          }}
        >
          <Typography
            variant="body2"
            color="#f5f5f5"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              lineHeight: 1.2,
              letterSpacing: "0.01rem",
            }}
          >
            Made with ♡ by Muskan | &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;

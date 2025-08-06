import React from "react";
import { Box, Button, Typography, Container, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
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
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: theme.palette.background.default,
          backgroundImage: dotPattern,
          backgroundSize: { xs: "15px 15px", md: "20px 20px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflowX: "hidden",
          pt: { xs: 6, sm: 8, md: 12 },
          pb: 0,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "20px", sm: "30px", md: "40px" },
            left: { xs: "20px", sm: "50px", md: "100px" },
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ 
              height: isMobile ? "50px" : "70px", 
              width: "auto", 
              cursor: "pointer" 
            }}
            onClick={() => navigate("/")}
          />
        </Box>

        {/* GitHub Icon */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "25px", sm: "35px", md: "50px" },
            right: { xs: "20px", sm: "50px", md: "100px" },
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
          <FaGithub size={isMobile ? 35 : 45} />
        </Box>

        {/* Main Content */}
        <Container 
          maxWidth="md" 
          sx={{ 
            textAlign: "center",
            px: { xs: 3, sm: 4, md: 3 },
            mt: { xs: 4, sm: 6, md: 0 }
          }}
        >
          <Typography 
            variant={isSmallMobile ? "h3" : isMobile ? "h2" : "h2"}
            fontWeight={800} 
            color="#1a1a1a" 
            mb={2}
            sx={{
              fontSize: { 
                xs: "2rem", 
                sm: "2.5rem", 
                md: "3rem",
                lg: "3.5rem"
              },
              lineHeight: { xs: 1.2, md: 1.3 },
              px: { xs: 0, sm: 2 }
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
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              lineHeight: { xs: 1.4, md: 1.6 },
              px: { xs: 1, sm: 3, md: 0 }
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
              gap: { xs: 2, sm: 2 }, 
              mb: { xs: 4, md: 6 },
              px: { xs: 2, sm: 0 }
            }}
          >
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              sx={{
                backgroundColor: "#5474f9",
                color: "white",
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 1.5 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                minWidth: { xs: "200px", sm: "auto" },
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
              size={isMobile ? "medium" : "large"}
              sx={{
                borderColor: "#5474f9",
                color: "#5474f9",
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 1.5 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                minWidth: { xs: "200px", sm: "auto" },
                "&:hover": {
                  backgroundColor: "#f0f0ff",
                },
              }}
              onClick={() => navigate("/templates")}
            >
              Explore Templates
            </Button>
          </Box>

          {/* Screenshot */}
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "center", 
              mb: { xs: 4, md: 6 },
              px: { xs: 1, sm: 2, md: 0 }
            }}
          >
            <img
              src="/homepage-preview.png"
              alt="Editor Screenshot"
              style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : "800px",
                height: "auto",
                borderRadius: isMobile ? "8px" : "12px",
                boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            width: "100%",
            py: { xs: 3, md: 2 },
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
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              lineHeight: 1.2,
              letterSpacing: "0.01rem",
              px: { xs: 2, sm: 0 }
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

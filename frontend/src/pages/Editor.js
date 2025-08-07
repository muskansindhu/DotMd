import { useState } from "react";
import { MarkdownEditor } from "../components/ui/MarkdownEditor";
import { Menu } from "../components/ui/Menu";
import { Preview } from "../components/ui/Preview";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SlugProvider } from "../context/slug";
import { ContentProvider } from "../context/content";
import AISuggestionButton from "../components/ui/AISuggestionButton";
import Navbar from "../components/ui/Navbar";
import {
  Box,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  Drawer,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
  palette: {
    primary: { main: "#333" },
    secondary: { main: "#5271ff" },
  },
  typography: { fontFamily: "sans-serif" },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          padding: "10px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#1976d2",
          fontSize: "1rem",
        },
      },
    },
  },
});

function Editor() {
  const [showPreview, setShowPreview] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

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

  return (
    <SlugProvider>
      <ContentProvider>
        <ThemeProvider theme={theme}>
          <Navbar
            showPreview={showPreview}
            onDownload={handleDownloadClick}
            onMenuClick={() => setDrawerOpen(true)}
          />

          {/* Drawer for Mobile Menu */}
          {isMobile && (
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
              <Box sx={{ mt: 2 }}>
                <AISuggestionButton />
              </Box>
            </Drawer>
          )}

          {/* Mobile Toggle */}
          {isMobile && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
            >
              <ToggleButtonGroup
                value={showPreview ? "preview" : "editor"}
                exclusive
                onChange={(_, value) => {
                  if (value === "editor") setShowPreview(false);
                  if (value === "preview") setShowPreview(true);
                }}
                aria-label="toggle editor/preview"
                size="small"
              >
                <ToggleButton value="editor" aria-label="editor">
                  Editor
                </ToggleButton>
                <ToggleButton value="preview" aria-label="preview">
                  Preview
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}

          {/* Main Content */}
          <Box
            sx={{
              width: "100%",
              minHeight: "calc(100vh - 64px)",
              mt: 0,
              pt: isMobile ? 0 : 4,
              px: { xs: 1, sm: 2, md: 4 },
              boxSizing: "border-box",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              overflow: "hidden",
              justifyContent: isMobile ? "center" : "initial",
              alignItems: isMobile ? "flex-start" : "initial",
            }}
          >
            {isMobile ? (
              showPreview ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 600,
                      px: 2,
                    }}
                  >
                    <Preview />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 600,
                      px: 2,
                    }}
                  >
                    <MarkdownEditor />
                  </Box>
                </Box>
              )
            ) : (
              <>
                {/* Sidebar */}
                <Box sx={{ width: 350, minWidth: 220, mr: 2, flexShrink: 0 }}>
                  <Menu />
                </Box>

                {/* Editor & Preview Side-by-Side */}
                <Box sx={{ flex: 1, display: "flex", gap: 2, minWidth: 0 }}>
                  {/* Editor */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                        px: 1,
                      }}
                    >
                      <Box className="header-text">Editor</Box>
                    </Box>
                    <MarkdownEditor />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 100,
                        right: 16,
                        zIndex: 1300,
                      }}
                    >
                      <AISuggestionButton />
                    </Box>
                  </Box>

                  {/* Preview */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                        px: 1,
                      }}
                    >
                      <Box className="header-text">Preview</Box>
                    </Box>
                    <Preview />
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {/* Floating AI Suggestion Button (Mobile Only) */}
          {isMobile && (
            <Box
              sx={{
                position: "fixed",
                bottom: 80,
                right: 32,
                zIndex: 1300,
              }}
            >
              <AISuggestionButton />
            </Box>
          )}
        </ThemeProvider>
      </ContentProvider>
    </SlugProvider>
  );
}

export default Editor;

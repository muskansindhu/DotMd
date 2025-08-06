import React, { useState, useContext } from "react";
import { MarkdownEditor } from "../components/ui/MarkdownEditor";
import { Menu } from "../components/ui/Menu";
import { Preview } from "../components/ui/Preview";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SlugProvider } from "../context/slug";
import { ContentProvider } from "../context/content";
import AISuggestionButton from "../components/ui/AISuggestionButton";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Visibility";

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

function EditorContent() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState('editor'); // 'editor' or 'preview'

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setMobileView(newView);
    }
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Menu />
      </Box>
      
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <AISuggestionButton />
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <div className="App">
        {/* Mobile Header with Menu Button and Toggle */}
        <Box sx={{ 
          position: 'fixed', 
          top: 64, // Below navbar
          left: 0, 
          right: 0, 
          zIndex: 1100,
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ 
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' }
            }}
          >
            <MenuIcon />
          </IconButton>

          <ToggleButtonGroup
            value={mobileView}
            exclusive
            onChange={handleViewChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                px: 2,
                py: 1,
                border: '1px solid #5474f9',
                '&.Mui-selected': {
                  backgroundColor: '#5474f9',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#3b5fda',
                  },
                },
                '&:not(.Mui-selected)': {
                  color: '#5474f9',
                  '&:hover': {
                    backgroundColor: 'rgba(84, 116, 249, 0.1)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="editor" aria-label="editor">
              <EditIcon sx={{ mr: 1, fontSize: '18px' }} />
              Editor
            </ToggleButton>
            <ToggleButton value="preview" aria-label="preview">
              <PreviewIcon sx={{ mr: 1, fontSize: '18px' }} />
              Preview
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Mobile Content */}
        <Box sx={{ 
          mt: '120px', // Account for navbar + header
          height: 'calc(100vh - 120px)',
          overflow: 'hidden'
        }}>
          {mobileView === 'editor' ? (
            <Box sx={{ height: '100%', p: 2 }}>
              <MarkdownEditor />
            </Box>
          ) : (
            <Box sx={{ height: '100%', p: 2 }}>
              <Preview />
            </Box>
          )}
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileMenuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              mt: '64px', // Below navbar
              height: 'calc(100vh - 64px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="App">
      <div className="layout-container">
        <div className="menu-section">
          <Menu />
        </div>
        <div className="ai-bar">
          <AISuggestionButton />
        </div>
        <div className="editor-section">
          <MarkdownEditor />
        </div>
        <div className="preview-section">
          <Preview />
        </div>
      </div>
    </div>
  );
}

function Editor() {
  return (
    <SlugProvider>
      <ContentProvider>
        <ThemeProvider theme={theme}>
          <EditorContent />
        </ThemeProvider>
      </ContentProvider>
    </SlugProvider>
  );
}

export default Editor;

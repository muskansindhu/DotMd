import { MarkdownEditor } from "./components/ui/MarkdownEditor";
import { Menu } from "./components/ui/Menu";
import { Preview } from "./components/ui/Preview";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SlugProvider } from "./context/slug";
import { React } from "react";

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

function App() {
  const sampleMarkdown = "";

  return (
    <SlugProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar></Navbar>
          <div className="layout-container">
            <div className="menu-section">
              <Menu />
            </div>
            <div className="editor-section">
              <MarkdownEditor />
            </div>
            <div className="preview-section">
              <Preview markdownText={sampleMarkdown} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </SlugProvider>
  );
}

export default App;

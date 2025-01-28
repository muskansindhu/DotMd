import React from "react";
import { MarkdownEditor } from "./components/ui/MarkdownEditor";
import { Menu } from "./components/ui/Menu";
import { Preview } from "./components/ui/Preview";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#333" },
    secondary: { main: "#5271ff" },
  },
});

function App() {
  const sampleMarkdown = "";

  return (
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
  );
}

export default App;

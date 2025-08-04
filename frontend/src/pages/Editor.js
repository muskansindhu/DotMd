import { MarkdownEditor } from "../components/ui/MarkdownEditor";
import { Menu } from "../components/ui/Menu";
import { Preview } from "../components/ui/Preview";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SlugProvider } from "../context/slug";
import { ContentProvider } from "../context/content";
import AISuggestionButton from "../components/ui/AISuggestionButton";

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
  return (
    <SlugProvider>
      <ContentProvider>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </ContentProvider>
    </SlugProvider>
  );
}

export default Editor;

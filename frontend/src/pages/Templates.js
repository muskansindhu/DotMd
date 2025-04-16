import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { MuiCard } from "../components/ui/MuiCard";

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

const Templates = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        mt={4}
        sx={{
          height: "600px",
          overflowX: "auto",
          paddingBottom: "80vh",
        }}
      >
        <Box display="flex" justifyContent="center" gap={4}>
          <MuiCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Template #1"
            description="This is template description."
          />
          <MuiCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Template #2"
            description="This is template description."
          />
          <MuiCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Template #3"
            description="This is template description."
          />
        </Box>
        <Box display="flex" justifyContent="center" gap={4}>
          <MuiCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Template #4"
            description="This is template description."
          />
          <MuiCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Template #5"
            description="This is template description."
          />
          <MuiCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Template #6"
            description="This is template description."
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Templates;

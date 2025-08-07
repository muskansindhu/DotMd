import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import { TemplateInfoCard } from "../components/ui/TemplateInfoCard";

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
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        mt={4}
        sx={{
          height: { xs: "auto", md: "600px" },
          overflowX: "auto",
          paddingBottom: { xs: 2, md: "80vh" },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          gap={4}
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
        >
          <TemplateInfoCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Oidc.Server"
            description="This is template description."
            tempId="OdicServer"
            githubLink={"https://github.com/Abblix/Oidc.Server"}
          />
          <TemplateInfoCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="size-limit"
            description="This is template description."
            tempId="SizeLimit"
            githubLink={"https://github.com/ai/size-limit"}
          />
          <TemplateInfoCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="Aimeos-Typo3"
            description="This is template description."
            tempId="AimeosTypo3"
            githubLink={"https://github.com/aimeos/aimeos-typo3"}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap={4}
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
        >
          <TemplateInfoCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="zoxide"
            description="This is template description."
            tempId="Zoxide"
            githubLink={"https://github.com/ajeetdsouza/zoxide"}
          />
          <TemplateInfoCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="shallow-backup"
            description="This is template description."
            tempId="ShallowBackup"
            githubLink={"https://github.com/alichtman/shallow-backup"}
          />
          <TemplateInfoCard
            image="https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png"
            title="stronghold.rs"
            description="This is template description."
            tempId="Stronghold"
            githubLink={"https://github.com/alichtman/stronghold"}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Templates;

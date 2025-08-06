import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
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
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('lg'));

  const templates = [
    {
      image: "https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png",
      title: "Oidc.Server",
      description: "This is template description.",
      tempId: "OdicServer",
      githubLink: "https://github.com/Abblix/Oidc.Server"
    },
    {
      image: "https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png",
      title: "size-limit",
      description: "This is template description.",
      tempId: "SizeLimit",
      githubLink: "https://github.com/ai/size-limit"
    },
    {
      image: "https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png",
      title: "Aimeos-Typo3",
      description: "This is template description.",
      tempId: "AimeosTypo3",
      githubLink: "https://github.com/aimeos/aimeos-typo3"
    },
    {
      image: "https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png",
      title: "zoxide",
      description: "This is template description.",
      tempId: "Zoxide",
      githubLink: "https://github.com/ajeetdsouza/zoxide"
    },
    {
      image: "https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png",
      title: "shallow-backup",
      description: "This is template description.",
      tempId: "ShallowBackup",
      githubLink: "https://github.com/alichtman/shallow-backup"
    },
    {
      image: "https://culturedcode.com/frozen/2021/08/hero-markdown-guide.p128.png",
      title: "stronghold.rs",
      description: "This is template description.",
      tempId: "Stronghold",
      githubLink: "https://github.com/alichtman/stronghold"
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {templates.map((template, index) => (
            <Grid 
              item 
              key={template.tempId}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '400px' } }}>
                <TemplateInfoCard
                  image={template.image}
                  title={template.title}
                  description={template.description}
                  tempId={template.tempId}
                  githubLink={template.githubLink}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Templates;

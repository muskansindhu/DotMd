import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { VscOpenPreview } from "react-icons/vsc";
import { BsSaveFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

const handleOpenTemplatePreview = (tempId) => {
  window.location.href = `/preview?template=${tempId}`;
};

const handleDownloadClick = async (tempId) => {
  try {
    const module = await import(`../../readme-templates/${tempId}.js`);
    const slugList = module.sectionList;
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

const handleEditClick = async (tempId) => {
  try {
    const module = await import(`../../readme-templates/${tempId}.js`);
    const sectionList = module.sectionList || [];

    localStorage.setItem("slug", JSON.stringify(sectionList));

    window.location.href = `/editor`;
  } catch (error) {
    console.error("Error loading template for editing:", error);
  }
};

export const TemplateInfoCard = ({
  image,
  title,
  description,
  tempId,
  githubLink,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        width: "100%",
        maxWidth: { xs: "100%", sm: "350px", md: "300px" },
        height: "100%"
      }}
    >
      <Card 
        sx={{ 
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          }
        }}
      >
        <CardMedia
          component="img"
          height={isMobile ? "120" : "140"}
          image={image}
          alt={title}
          sx={{
            objectFit: "cover"
          }}
        />
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              fontWeight: "bold",
              lineHeight: 1.2,
              mb: 1
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.85rem", sm: "0.875rem" },
              lineHeight: 1.4
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions 
          sx={{ 
            justifyContent: isMobile ? "space-around" : "flex-start",
            px: 2,
            pb: 2,
            pt: 0
          }}
        >
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <Button 
              size="small"
              sx={{
                minWidth: { xs: "40px", sm: "auto" },
                p: { xs: 1, sm: 1 }
              }}
            >
              <FaGithub size={isMobile ? 18 : 20} color="black" />
            </Button>
          </a>
          <Button 
            size="small"
            onClick={() => handleOpenTemplatePreview(tempId)}
            sx={{
              minWidth: { xs: "40px", sm: "auto" },
              p: { xs: 1, sm: 1 }
            }}
          >
            <VscOpenPreview size={isMobile ? 18 : 20} color="black" />
          </Button>
          <Button 
            size="small" 
            onClick={() => handleDownloadClick(tempId)}
            sx={{
              minWidth: { xs: "40px", sm: "auto" },
              p: { xs: 1, sm: 1 }
            }}
          >
            <BsSaveFill size={isMobile ? 18 : 20} color="black" />
          </Button>
          <Button 
            size="small" 
            onClick={() => handleEditClick(tempId)}
            sx={{
              minWidth: { xs: "40px", sm: "auto" },
              p: { xs: 1, sm: 1 }
            }}
          >
            <FaRegEdit size={isMobile ? 18 : 20} color="black" />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

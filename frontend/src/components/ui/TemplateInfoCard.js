import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
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
  return (
    <Box width="300px">
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <a href={githubLink}>
            <Button size="small">
              <FaGithub size={20} color="black" />
            </Button>
          </a>
          <Button size="small">
            <VscOpenPreview
              size={20}
              color="black"
              onClick={() => handleOpenTemplatePreview(tempId)}
            />
          </Button>
          <Button size="small" onClick={() => handleDownloadClick(tempId)}>
            <BsSaveFill size={20} color="black" />
          </Button>
          <Button size="small" onClick={() => handleEditClick(tempId)}>
            <FaRegEdit size={20} color="black" />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

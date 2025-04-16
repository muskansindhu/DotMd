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

export const MuiCard = ({ image, title, description }) => {
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
          <Button size="small">
            {" "}
            <FaGithub size={20} color="black" />
          </Button>
          <Button size="small">
            <VscOpenPreview size={20} color="black" />
          </Button>
          <Button size="small">
            <BsSaveFill size={20} color="black" />
          </Button>
          <Button size="small">
            <FaRegEdit size={20} color="black" />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

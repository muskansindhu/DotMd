import React, { useState } from "react";
import { sectionList } from "../section-templates/section";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { slugContext } from "../../context/slug.js";

const Menu = () => {
  const [section, setSection] = useState(sectionList);
  const [selectedSection, setSelectedSection] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const { setSlug } = useContext(slugContext);

  const addSectionToSelectedSection = (item) => {
    setSelectedSection([...selectedSection, item]);
  };

  const removeSectionFromAddSectionMenu = (item) => {
    const updatedSectionList = section.filter((section) => section !== item);
    setSection(updatedSectionList);
  };

  const handleClickToSelect = (slugObj) => {
    setSlug({
      slug: slugObj.slug,
      name: slugObj.name,
      markdown: slugObj.markdown,
    });

    addSectionToSelectedSection(slugObj);
    removeSectionFromAddSectionMenu(slugObj);
  };

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = (sectionName) => {
    setOpen(false);
    if (sectionName) {
      const newSection = {
        slug: `section-${section.length + 1}`,
        name: sectionName,
        markdown: `New Section ${section.length + 1}`,
      };
      setSection([...section, newSection]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleToClose(formData.name);
  };

  return (
    <div>
      <div>
        <Dialog
          open={open}
          onClose={() => handleToClose()}
          sx={{
            "& .MuiDialog-paper": {
              width: "40vw",
              maxWidth: "none",
            },
          }}
        >
          <DialogTitle>{"New Custom Section"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                name="name"
                label="Section Title"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleFormChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleToClose(formData.name)}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="scrollable-list-container">
        {" "}
        <ul>
          <h5 className="section-menu-title">
            Click on a section below to edit the contents
          </h5>
          {selectedSection.map((item) => (
            <li key={item.slug} className="list-item">
              <div className="list-item-text">{item.name}</div>
            </li>
          ))}
          <br />
          <br />
        </ul>
        <ul>
          <h5 className="section-menu-title">
            Click on a section below to add it to your readme
          </h5>
          <li onClick={handleClickToOpen} className="add-section-button">
            <div className="add-section-button-text">Custom Section</div>
          </li>
          {section.map((item) => (
            <li
              onClick={() => handleClickToSelect(item)}
              key={item.slug}
              className="list-item"
            >
              <div className="list-item-text">{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };

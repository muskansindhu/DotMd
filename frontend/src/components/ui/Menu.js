import React, { useState } from "react";

import { sectionList } from "../section-templates/section";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Menu = () => {
  const [section, setSection] = useState(sectionList);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({ name: "" });

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
        <Dialog open={open} onClose={() => handleToClose()}>
          <DialogTitle>{"Add Custom Section"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name for your new section.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleFormChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleToClose(formData.name)}
              color="primary"
              autoFocus
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="scrollable-list-container">
        {" "}
        <ul>
          <li onClick={handleClickToOpen} className="add-section-button">
            <div className="add-section-button-text">Custom Section</div>
          </li>
          {section.map((item) => (
            <li key={item.slug} className="list-item">
              <div className="list-item-text">{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };

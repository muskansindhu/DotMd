import React, { useState, useEffect } from "react";
import { sectionList } from "../section-templates/section";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { slugContext } from "../../context/slug.js";
import { contentContext } from "../../context/content.js";
import { MdOutlineDragIndicator } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
  const [section, setSection] = useState(() => {
    const stored = localStorage.getItem("slug");
    let selectedSlugs = [];
    try {
      selectedSlugs = stored ? JSON.parse(stored).map((s) => s.slug) : [];
    } catch {
      selectedSlugs = [];
    }
    return sectionList
      .filter((s) => !selectedSlugs.includes(s.slug))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const { slug, setSlug } = useContext(slugContext);
  const { setContent } = useContext(contentContext);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(() => {
    const stored = localStorage.getItem("slug");
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("slug", JSON.stringify(selectedSection));
    setContent(selectedSection);
  }, [selectedSection, setContent]);

  const addSectionToSelectedSection = (item) => {
    const storedData = localStorage.getItem("slug");
    const existingSections = storedData ? JSON.parse(storedData) : [];

    const updatedSections = [...existingSections, item];

    setSelectedSection(updatedSections);
    setContent(updatedSections);
    localStorage.setItem("slug", JSON.stringify(updatedSections));
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

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...selectedSection];
    const draggedItem = updated.splice(draggedIndex, 1)[0];
    updated.splice(index, 0, draggedItem);
    setSelectedSection(updated);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleRemoveSection = (item) => {
    const updatedSelected = selectedSection.filter((i) => i.slug !== item.slug);
    setSelectedSection(updatedSelected);

    if (item.slug === slug.slug || updatedSelected.length === 0) {
      setSlug({ slug: "", name: "", markdown: "" });
    }

    setSection((prev) => {
      const updated = [...prev, item];
      return updated.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  const handleRefreshSection = (item) => {
    const defaultItem = sectionList.find((s) => s.slug === item.slug);
    if (!defaultItem) return;

    const updatedSections = selectedSection.map((s) =>
      s.slug === item.slug ? { ...s, markdown: defaultItem.markdown } : s
    );

    setSelectedSection(updatedSections);
    setContent(updatedSections);
    localStorage.setItem("slug", JSON.stringify(updatedSections));

    if (slug.slug === item.slug) {
      setSlug({ ...slug, markdown: defaultItem.markdown });
    }
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

  const handleSectionClick = (item) => {
    const stored = localStorage.getItem("slug");
    const storedSections = stored ? JSON.parse(stored) : [];

    const matched = storedSections.find((s) => s.slug === item.slug);

    setSlug({
      slug: item.slug,
      name: item.name,
      markdown: matched?.markdown ?? item.markdown,
    });
  };

  const handleResetAll = () => {
    localStorage.removeItem("slug");
    setSelectedSection([]);
    setSection(sectionList.sort((a, b) => a.name.localeCompare(b.name)));
    setSlug({ slug: "", name: "", markdown: "" });
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            color: "#444",
          }}
          onClick={handleResetAll}
        >
          <span class="reset-btn">Reset</span>
          <SlRefresh size={15} />
        </div>
      </div>

      <div className="scrollable-list-container">
        {" "}
        <ul>
          <h5 className="section-menu-title">
            {selectedSection.length > 0
              ? "Click on a section below to edit the contents"
              : "No sections selected. Click below to add sections"}
          </h5>
          <AnimatePresence>
            {selectedSection.map((item, index) => (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`list-item ${
                  slug.slug === item.slug ? "active-section" : ""
                }`}
              >
                <MdOutlineDragIndicator
                  size={20}
                  color="black"
                  className="drag-icon"
                />
                <div
                  className="list-item-text"
                  onClick={() => handleSectionClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.name}
                </div>
                <SlRefresh
                  size={20}
                  color="black"
                  className="refresh-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefreshSection(item);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <FaTrashAlt
                  size={18}
                  color="black"
                  className="trash-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSection(item);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </motion.li>
            ))}
          </AnimatePresence>
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

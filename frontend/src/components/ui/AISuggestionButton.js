import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { contentContext } from "../../context/content";
import { slugContext } from "../../context/slug";

export default function AISuggestionButton() {
  const { setSlug } = useContext(slugContext);
  const { selectedSection, setSelectedSection } = useContext(contentContext);

  const [open, setOpen] = useState(false);
  const [sectionDetails, setSectionDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSectionDetails("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5002/ai-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section_details: sectionDetails }),
      });

      const data = await res.json();
      const sectionName = data.section_name?.trim() || "AI Section";
      const sectionContent = data.section_content?.trim() || "";
      const sectionMarkdown = `\n\n## ${sectionName}\n\n${sectionContent}`;

      const newSection = {
        slug: sectionName,
        name: sectionName,
        markdown: sectionMarkdown,
      };

      const alreadyExists = selectedSection.some((s) => s.slug === sectionName);

      if (!alreadyExists) {
        const updatedSections = [...selectedSection, newSection];
        setSelectedSection(updatedSections);
        localStorage.setItem("slug", JSON.stringify(updatedSections));
      }

      setSlug({
        slug: sectionName,
        name: sectionName,
        markdown: sectionMarkdown,
      });

      handleClose();
    } catch (err) {
      console.error("AI suggestion error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="AI Suggest Section">
        <IconButton onClick={handleOpen} color="secondary" size="small">
          <img
            src="/assets/star.png"
            alt="AI Suggest"
            style={{ width: 20, height: 20 }}
          />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>AI Suggestion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="What section do you want help with?"
            fullWidth
            value={sectionDetails}
            onChange={(e) => setSectionDetails(e.target.value)}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? "Generating..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

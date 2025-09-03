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
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from "@mui/material";
import { contentContext } from "../../context/content";
import { slugContext } from "../../context/slug";

export default function AISuggestionButton() {
  const { setSlug } = useContext(slugContext);
  const { selectedSection, setSelectedSection } = useContext(contentContext);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("section");
  const [sectionDetails, setSectionDetails] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSectionDetails("");
    setRepoUrl("");
    setMode("section");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "section") {
        // Single section suggestion
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/ai-section-suggestion`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ section_details: sectionDetails }),
          }
        );

        const data = await res.json();
        const sectionName = data.section_name?.trim() || "AI Section";
        const sectionContent = data.section_content?.trim() || "";
        const sectionMarkdown = `\n\n## ${sectionName}\n\n${sectionContent}`;

        const newSection = {
          slug: sectionName,
          name: sectionName,
          markdown: sectionMarkdown,
        };

        const alreadyExists = selectedSection.some(
          (s) => s.slug === sectionName
        );

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
      } else {
        // Full README suggestion
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/ai-readme-suggestion`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ repo_url: repoUrl }),
          }
        );

        const data = await res.json();
        if (data.readme && typeof data.readme === "object") {
          const sectionOrder = [
            "📖 Overview",
            "✨ Features",
            "🚀 Installation",
            "🛠️ Usage",
            "📦 Technologies",
            "🔧 Configuration",
            "✅ Requirements",
            "🤝 Contributing",
            "📄 Documentation",
            "❤️ Acknowledgements",
            "📝 Changelog",
          ];

          const orderedSectionNames = [
            ...sectionOrder.filter((key) => key in data.readme),
            ...Object.keys(data.readme).filter(
              (key) => !sectionOrder.includes(key)
            ),
          ];

          const newSections = orderedSectionNames.map((sectionName) => ({
            slug: sectionName.trim() || "AI Section",
            name: sectionName.trim() || "AI Section",
            markdown: `\n\n## ${sectionName.trim()}\n\n${
              data.readme[sectionName]?.trim() || ""
            }`,
          }));

          const slugs = new Set(selectedSection.map((s) => s.slug));
          const mergedSections = [
            ...selectedSection,
            ...newSections.filter((s) => !slugs.has(s.slug)),
          ];

          setSelectedSection(mergedSections);
          localStorage.setItem("slug", JSON.stringify(mergedSections));

          if (newSections.length > 0) {
            setSlug(newSections[0]);
          }
        }
      }
      handleClose();
    } catch (err) {
      console.error("AI suggestion error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="AI Suggest Section or README">
        <IconButton onClick={handleOpen} color="secondary" size="small">
          <img
            src="/assets/sparkle.png"
            alt="AI Suggest"
            style={{ width: 30, height: 30 }}
          />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>AI Suggestion</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, value) => value && setMode(value)}
              size="small"
              color="primary"
            >
              <ToggleButton value="section">Section</ToggleButton>
              <ToggleButton value="readme">Full README</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {mode === "section" ? (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Generate content for a single section.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="What section do you want help with?"
                fullWidth
                value={sectionDetails}
                onChange={(e) => setSectionDetails(e.target.value)}
                disabled={loading}
              />
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Generate a full README. Enter your public GitHub repo URL.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="GitHub Repository URL"
                fullWidth
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={loading}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              loading || (mode === "section" ? !sectionDetails : !repoUrl)
            }
          >
            {loading ? "Generating..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

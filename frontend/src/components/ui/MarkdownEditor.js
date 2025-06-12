import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { slugContext } from "../../context/slug.js";
import { contentContext } from "../../context/content.js";

const options = {
  readOnly: false,
  minimap: { enabled: false },
  scrollbar: { vertical: "hidden" },
  lineNumbers: "off",
  wordWrap: "on",
};

function MarkdownEditor() {
  const { slug, setSlug } = useContext(slugContext);
  const { setContent } = useContext(contentContext);
  const { content } = useContext(contentContext);

  const handleEditorChange = (value) => {
    const updated = { ...slug, markdown: value };
    setSlug(updated);

    const stored = localStorage.getItem("slug");
    const storedSections = stored ? JSON.parse(stored) : [];

    const updatedSections = storedSections.map((s) =>
      s.slug === updated.slug ? updated : s
    );

    localStorage.setItem("slug", JSON.stringify(updatedSections));
    setContent(updatedSections);
  };

  return (
    <>
      {content.length > 0 ? (
        <Editor
          value={slug.markdown}
          height="80vh"
          width="95%"
          defaultLanguage="markdown"
          theme="vs-dark"
          options={options}
          onChange={handleEditorChange}
        />
      ) : (
        <h5 className="editor-placeholder-title">
          Please select a section from the section menu to edit.
        </h5>
      )}
    </>
  );
}

export { MarkdownEditor };

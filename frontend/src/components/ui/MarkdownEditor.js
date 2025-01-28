import Editor from "@monaco-editor/react";

const options = {
  readOnly: false,
  minimap: { enabled: false },
  scrollbar: { vertical: "hidden" },
  lineNumbers: "off",
  wordWrap: "on",
};

function MarkdownEditor() {
  return (
    <Editor
      height="80vh"
      width="95%"
      defaultLanguage="markdown"
      theme="vs-dark"
      options={options}
    />
  );
}

export { MarkdownEditor };

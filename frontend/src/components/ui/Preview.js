import React, { useContext } from "react";
import Markdown from "react-markdown";
import { contentContext } from "../../context/content";
import remarkGfm from "remark-gfm";

const Preview = () => {
  const { content } = useContext(contentContext);
  const combinedMarkdown = content.map((item) => item.markdown).join("\n\n");

  console.log(combinedMarkdown);

  return (
    <div className="preview-container">
      <div className="preview">
        <Markdown remarkPlugins={[remarkGfm]}>{combinedMarkdown}</Markdown>
      </div>
    </div>
  );
};

export { Preview };

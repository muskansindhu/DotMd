import React, { useContext, useEffect, useMemo } from "react";
import Markdown from "react-markdown";
import { contentContext } from "../../context/content";
import { slugContext } from "../../context/slug";
import remarkGfm from "remark-gfm";

const Preview = () => {
  const { content } = useContext(contentContext);
  const { slug } = useContext(slugContext);

  const mergedContent = useMemo(() => {
    return content.map((item) =>
      item.slug === slug.slug ? { ...item, markdown: slug.markdown } : item
    );
  }, [content, slug]);

  const combinedMarkdown = useMemo(() => {
    return mergedContent.map((item) => item.markdown).join("\n\n");
  }, [mergedContent]);

  useEffect(() => {
    localStorage.setItem("slug", JSON.stringify(mergedContent));
  }, [mergedContent]);

  return (
    <div className="preview-container">
      <div className="preview">
        <Markdown remarkPlugins={[remarkGfm]}>{combinedMarkdown}</Markdown>
      </div>
    </div>
  );
};

export { Preview };

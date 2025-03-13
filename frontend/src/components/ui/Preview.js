import React, { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { contentContext } from "../../context/content";
import remarkGfm from "remark-gfm";
import { slugContext } from "../../context/slug";

const Preview = () => {
  const { content, setContent } = useContext(contentContext);
  const { slug } = useContext(slugContext);
  const [combinedMarkdown, setCombinedMarkdown] = useState("");

  useEffect(() => {
    const updatedContent = content.map((item) =>
      item.slug === slug.slug ? { ...item, markdown: slug.markdown } : item
    );

    setContent((prevContent) => {
      const mergedContent = prevContent.map(
        (prevItem) =>
          updatedContent.find((newItem) => newItem.slug === prevItem.slug) ||
          prevItem
      );

      return [
        ...mergedContent,
        ...updatedContent.filter(
          (newItem) =>
            !prevContent.some((prevItem) => prevItem.slug === newItem.slug)
        ),
      ];
    });

    const newMarkdown = updatedContent
      .map((item) => item.markdown)
      .join("\n\n");
    setCombinedMarkdown(newMarkdown);

    localStorage.setItem("slug", JSON.stringify(updatedContent));
  }, [slug, content, setContent]);

  return (
    <div className="preview-container">
      <div className="preview">
        <Markdown remarkPlugins={[remarkGfm]}>{combinedMarkdown}</Markdown>
      </div>
    </div>
  );
};

export { Preview };

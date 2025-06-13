import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const TemplatePreview = () => {
  const [params] = useSearchParams();
  const templateSlug = params.get("template");
  const [combinedMarkdown, setCombinedMarkdown] = useState("");

  useEffect(() => {
    if (templateSlug) {
      import(`../readme-templates/${templateSlug}.js`)
        .then((mod) => {
          const sectionList = mod.sectionList || [];
          localStorage.setItem("slug", JSON.stringify(sectionList));

          const allMarkdown = sectionList
            .map((item) => item.markdown)
            .join("\n\n");

          setCombinedMarkdown(allMarkdown);
        })
        .catch((err) => {
          console.error(`Failed to load template: ${templateSlug}`, err);
        });
    }
  }, [templateSlug]);

  return (
    <div className="template-preview-container">
      <div className="template-preview preview">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {combinedMarkdown}
        </Markdown>
      </div>
    </div>
  );
};

export default TemplatePreview;

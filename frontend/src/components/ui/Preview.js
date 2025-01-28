import Markdown from "react-markdown";

const Preview = ({ markdownText }) => {
  return (
    <div className="preview-container">
      <Markdown>{markdownText}</Markdown>
    </div>
  );
};
export { Preview };

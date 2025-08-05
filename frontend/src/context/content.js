import { createContext, useState } from "react";

export const contentContext = createContext({
  content: [],
  setContent: () => {},
  selectedSection: [],
  setSelectedSection: () => {},
});

export const ContentProvider = ({ children }) => {
  const initialSelectedSection = (() => {
    try {
      const stored = localStorage.getItem("slug");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })();

  const [content, setContent] = useState([]);
  const [selectedSection, setSelectedSection] = useState(
    initialSelectedSection
  );

  return (
    <contentContext.Provider
      value={{ content, setContent, selectedSection, setSelectedSection }}
    >
      {children}
    </contentContext.Provider>
  );
};

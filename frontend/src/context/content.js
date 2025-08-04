import { createContext, useState } from "react";

export const contentContext = createContext({
  content: [],
  setContent: () => {},
  selectedSection: [],
  setSelectedSection: () => {},
});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);

  return (
    <contentContext.Provider
      value={{ content, setContent, selectedSection, setSelectedSection }}
    >
      {children}
    </contentContext.Provider>
  );
};

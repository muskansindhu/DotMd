import { createContext } from "react";
import { useState } from "react";

export const contentContext = createContext({
  content: [],
  setContent: (content) => {},
});

export const ContentProvider = (props) => {
  const [content, setContent] = useState([]);
  return (
    <contentContext.Provider value={{ content, setContent }}>
      {props.children}
    </contentContext.Provider>
  );
};

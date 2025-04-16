import { createContext } from "react";
import { useState } from "react";

export const slugContext = createContext({
  slug: {
    slug: "title-and-description",
    name: "Title and Description",
    markdown: `
  # Project Title
  
  A brief description of what this project does and who it's for
  
  `,
  },
  setSlug: (slug) => {},
});

export const SlugProvider = (props) => {
  const [slug, setSlug] = useState({
    slug: "title-and-description",
    name: "Title and Description",
    markdown: `
  # Project Title
  
  A brief description of what this project does and who it's for
  
  `,
  });
  return (
    <slugContext.Provider value={{ slug, setSlug }}>
      {props.children}
    </slugContext.Provider>
  );
};

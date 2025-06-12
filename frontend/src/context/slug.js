import { createContext } from "react";
import { useState } from "react";

export const slugContext = createContext({
  slug: {
    slug: "",
    name: "",
    markdown: ``,
  },
  setSlug: (slug) => {},
});

export const SlugProvider = (props) => {
  const [slug, setSlug] = useState({
    slug: "",
    name: "",
    markdown: ``,
  });
  return (
    <slugContext.Provider value={{ slug, setSlug }}>
      {props.children}
    </slugContext.Provider>
  );
};

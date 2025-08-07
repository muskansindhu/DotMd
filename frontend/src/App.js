import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Templates from "./pages/Templates";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import TemplatePreview from "./pages/TemplatePreview";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/editor" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/preview" element={<TemplatePreview />} />
      </Routes>
    </>
  );
};

export default App;

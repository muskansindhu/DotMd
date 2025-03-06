import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templates from "./pages/Templates";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="markdown-editor" element={<App />} />
        <Route path="templates" element={<Templates />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

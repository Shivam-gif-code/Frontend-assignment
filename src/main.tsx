import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";   // ✅ must match file name in src
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

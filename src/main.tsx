// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import WalletApp from "./WalletApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WalletApp />
  </React.StrictMode>
);

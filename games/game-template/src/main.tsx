import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Layout } from "@shared/Layout";
import { PlayerProvider } from "@shared/PlayerContext";
import "@shared/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlayerProvider>
      <Layout gameName={"Game Name"}>
        <App />
      </Layout>
    </PlayerProvider>
  </React.StrictMode>
);

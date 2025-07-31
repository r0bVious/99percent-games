import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Layout } from "@shared/Layout";
import { PlayerProvider } from "@shared/PlayerContext";
import "@shared/styles.css";
import "./roulette.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlayerProvider>
      <Layout gameName="Roulette">
        <App />
      </Layout>
    </PlayerProvider>
  </React.StrictMode>
);

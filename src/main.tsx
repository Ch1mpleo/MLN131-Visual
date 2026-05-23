import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GameAI from "./pages/GameAI";
import { useRoute } from "./lib/router";
import "./index.css";

function Root() {
  const path = useRoute();
  if (path === "/game-ai") return <GameAI />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

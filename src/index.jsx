import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FavoritesProvider } from "./context/FavoritesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesProvider>
    <App />
  </FavoritesProvider>
);

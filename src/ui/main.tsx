import "./index.css";

import App from "./app.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import NavigationMenu from "./components/navigation-menu.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
        <Toaster position="bottom-center" />
        <Tooltip id="app-tooltip" />
        <NavigationMenu />
    </React.StrictMode>
);

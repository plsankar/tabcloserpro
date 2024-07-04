import "./index.css";

import App from "./app.tsx";
import NavigationMenu from "./components/navigation-menu.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Tooltip } from "react-tooltip";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <div className="text-[0.825rem] antialiased h-full">
            <App />
            <Tooltip id="app-tooltip" />
            <NavigationMenu />
        </div>
    </React.StrictMode>
);

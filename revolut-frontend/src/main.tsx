import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/* ------------------------------ Disable Inspect ------------------------------------ */
// Disable right-click
document.addEventListener("contextmenu", (e) => e.preventDefault());

function ctrlShiftKey(e: KeyboardEvent, keyCode: string) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (event: KeyboardEvent) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(event, "I") ||
    ctrlShiftKey(event, "J") ||
    ctrlShiftKey(event, "C") ||
    (event.ctrlKey && event.keyCode === "U".charCodeAt(0))
  )
    return false;
};
/* ----------------------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

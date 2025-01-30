import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you are using ReactDOM from React 18
import "./index.css"; // Import TailwindCSS styles
import App from "./App"; // Import the main App component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import react-router-dom
import { createRoot } from "react-dom/client";

// import style
import "./index.css";

// import App components
import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";

// import  GlobalContext
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <App />
    <ToastContainer position="bottom-right" />
  </GlobalContextProvider>,
);

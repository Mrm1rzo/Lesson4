// import react-router-dom
import { createRoot } from "react-dom/client";

// import style
import "./index.css";

// import App components
import App from "./App.jsx";

// import  GlobalContext
import { GlobalContextProvider } from "./context/GlobalContext.jsx";




createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
);

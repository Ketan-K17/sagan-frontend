import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/context.tsx";
createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);

{
  /* <StrictMode>
  <AppProvider>
    <App />
  </AppProvider>
</StrictMode>; */
}

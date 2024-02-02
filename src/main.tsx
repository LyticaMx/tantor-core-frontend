import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <div className="bg-background text-foreground">
      <App />
    </div>
  </NextUIProvider>
);

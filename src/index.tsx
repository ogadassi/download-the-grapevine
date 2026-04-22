import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/LayoutArea/Layout/Layout";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Layout />{" "}
    </ThemeProvider>
  </BrowserRouter>
);

reportWebVitals();

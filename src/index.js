import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./Home";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <NotificationsProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

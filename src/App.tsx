import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/route";
import React from "react";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";
import { Theme, useTheme } from "@/contexts/ThemeContext";

export default function App() {
  const { theme: currentTheme } = useTheme();
  return (
    <ConfigProvider  theme={{
      algorithm: currentTheme === Theme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
          const Layout = route?.layout || React.Fragment;
          const Component = route?.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                Component ? (
                  <Layout>
                    <Component />
                  </Layout>
                ) : null
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
      </BrowserRouter>
      </ConfigProvider>
  );
}

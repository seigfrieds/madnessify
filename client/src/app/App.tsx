import React from "react";
import "./App.css";
import Header from "../components/Header/Header";
import AuthProvider from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import TournamentPage from "./pages/Tournament/TournamentPage";
import NotFound from "./components/404";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

type ProtectedProps = {
  isAllowed: boolean;
  redirect: string;
  children: React.ReactNode;
};

function Protected({ isAllowed, redirect, children }: ProtectedProps): React.ReactNode {
  if (!isAllowed) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}

function App(): React.JSX.Element {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const spotifyToken = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (spotifyToken) {
        setToken(spotifyToken);
        navigate("/home", { state: { token: spotifyToken }, replace: true });
      }
    }
  }, []);

  return (
    <>
      <Routes>
        {/** Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        {/** Private routes */}
        <Route
          path="/home"
          element={
            <Protected isAllowed={!!token} redirect="/login">
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/tournament"
          element={
            <Protected isAllowed={!!token} redirect="/login">
              <TournamentPage />
            </Protected>
          }
        />

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

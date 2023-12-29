import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import TournamentPage from "./pages/Tournament/TournamentPage";
import NotFound from "./components/404";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  const [spotifyToken, setSpotifyToken] = useState("");
  const [cookies] = useCookies(["spotifyToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.spotifyToken) {
      setSpotifyToken(cookies.spotifyToken);
      navigate("/home", { state: { spotifyToken: cookies.spotifyToken }, replace: true });
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
            <Protected isAllowed={!!spotifyToken} redirect="/login">
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/tournament"
          element={
            <Protected isAllowed={!!spotifyToken} redirect="/login">
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

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
  const [spotifyToken, setSpotifyToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const spotifyAuthToken = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (spotifyAuthToken) {
        setSpotifyToken(spotifyAuthToken);
        navigate("/home", { state: { spotifyToken: spotifyAuthToken }, replace: true });
      }
    }

    fetch("http://localhost:3005/api")
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((data) => {
        console.log(data);
      });
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

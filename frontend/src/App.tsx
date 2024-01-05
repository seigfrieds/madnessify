import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import TournamentPage from "./pages/Tournament/TournamentPage";
import NotFound from "./components/404";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      let succeeded = false;

      await axios
        .get(`${import.meta.env.VITE_API_URL}/oauth/check`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            succeeded = true;
            setIsAuth(true);
          }
        });

      if (succeeded) {
        navigate("/home", { replace: true });
      }
    };

    checkAuth();
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
            <Protected isAllowed={!!isAuth} redirect="/login">
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/tournament"
          element={
            <Protected isAllowed={!!isAuth} redirect="/login">
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

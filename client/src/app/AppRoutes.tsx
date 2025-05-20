import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import TournamentPage from "./pages/Tournament/TournamentPage";
import NotFound from "../components/404";
import Result from "./pages/Result/Result";

type ProtectedProps = {
  redirect: string;
  children: React.ReactNode;
};

function Protected({ redirect, children }: ProtectedProps): React.ReactNode {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/oauth/check`, { withCredentials: true });
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setIsLoaded(true);
      }
    };

    checkAuth();
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}

function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      {/** Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/result/:resultId" element={<Result />}></Route>

      {/** Private routes */}
      <Route
        path="/home"
        element={
          <Protected redirect="/login">
            <HomePage />
          </Protected>
        }
      />
      <Route
        path="/tournament"
        element={
          <Protected redirect="/login">
            <TournamentPage />
          </Protected>
        }
      />

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;

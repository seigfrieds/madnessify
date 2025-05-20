import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";
import TournamentPage from "../pages/Tournament/TournamentPage";
import NotFound from "../components/404";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Result from "../pages/Result/Result";
import AuthProvider, { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

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

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

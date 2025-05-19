import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/oauth/check`, { withCredentials: true });
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
}

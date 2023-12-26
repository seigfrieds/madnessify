//wow!

import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";

function App(): React.JSX.Element {
  const [token, setToken] = useState("");

  //when you click login to spotify and login, it returns to url with info
  //e.g. localhost:3000 -> then click spotify login -> localhost:3000/#access_token=BQD5...
  //info split into two: access_token and token_type -> need to split
  useEffect(() => {
    if (window.location.hash) {
      const spotifyToken = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (spotifyToken) {
        setToken(spotifyToken);
      }

      window.location.hash = "";
    }
  }, []);

  return <div className="App">{token ? <HomePage token={token} /> : <LoginPage />}</div>;
}

export default App;

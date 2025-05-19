import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { redirectToSpotifyLogin } from "./Header.logic";
import "./Header.css";
import { useUserData } from "./useUserData";

function Header(): React.JSX.Element {
  const { isAuth } = useContext(AuthContext);
  const [picture] = useUserData();

  return (
    <>
      <div className="header-bar">
        <p id="header-title">Madnessify</p>
        {isAuth ? (
          <img className="user-picture" src={picture}></img>
        ) : (
          <button className="login-button" onClick={redirectToSpotifyLogin}>
            Log in to Spotify!
          </button>
        )}
      </div>
    </>
  );
}

export default Header;

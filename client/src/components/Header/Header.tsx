import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Header.css";

function Header(): React.JSX.Element {
  const [picture, setPicture] = useState(undefined);

  useEffect(() => {
    const getPictureUrl = async (): Promise<void> => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/spotify/getUserProfile`, {
          withCredentials: true,
        })
        .then((res) => {
          setPicture(res.data.images[0].url);
        });
    };
    getPictureUrl();
  }, []);

  return (
    <>
      <div className="header-bar">
        <p>Brackets</p>
        <p>Results</p>
        {picture ? (
          <img className="user-picture" src={picture}></img>
        ) : (
          <button
            className="login-button"
            onClick={async () => {
              const res = await fetch(`${import.meta.env.VITE_API_URL}/oauth/login`, {
                redirect: "manual",
              });
              window.location.replace(res.url);
            }}
          >
            Log in to Spotify!
          </button>
        )}
      </div>
    </>
  );
}

export default Header;

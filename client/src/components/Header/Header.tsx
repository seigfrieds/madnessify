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
        <img className="user-picture" src={picture}></img>
        <p>Brackets</p>
        <p>Results</p>
      </div>
    </>
  );
}

export default Header;

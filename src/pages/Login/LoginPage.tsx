import React from "react";
import "./LoginPage.css";
import { CONFIG } from "../../apiConfig";

export default function LoginPage(): React.JSX.Element {
  return (
    <div id="home-page">
      <h1 id="app-title">Madnessify!</h1>

      <h2 id="app-hook">
        Create a single-elimination bracket tournament out of your favorite songs on Spotify!
      </h2>

      <iframe width="420" height="315" src="https://www.youtube.com/embed/IMyBgxkcuw4"></iframe>

      <a
        href={`${CONFIG.authEndpoint}?client_id=${CONFIG.clientId}&redirect_uri=${CONFIG.redirectUri}&response_type=${CONFIG.responseType}&scope=${CONFIG.scope}`}
        className="spotify-login-button"
      >
        Log in to Spotify!
      </a>

      <a
        id="github-link"
        href="https://github.com/seigfrieds/madnessify"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}

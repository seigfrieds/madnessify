import React from "react";
import "./LoginPage.css";

export default function LoginPage(): React.JSX.Element {
  return (
    <div id="home-page">
      <h1 id="app-title">Madnessify!</h1>

      <h2 id="app-hook">
        Create a single-elimination bracket tournament out of your favorite songs on Spotify!
      </h2>

      <iframe width="420" height="315" src="https://www.youtube.com/embed/IMyBgxkcuw4"></iframe>

      <button
        className="spotify-login-button"
        onClick={async () => {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/oauth/login`, {
            redirect: "manual",
          });
          window.location.replace(res.url);
        }}
      >
        Log in to Spotify!
      </button>

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

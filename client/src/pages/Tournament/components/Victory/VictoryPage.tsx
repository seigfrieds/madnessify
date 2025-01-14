import React from "react";
import "./VictoryPage.css";
import spotifyLogo from "../../../../assets/Spotify_Logo_RGB_White.png";
import { MatchSet } from "../../../../types";
import { roundToDivs } from "./VictoryPage.logic";
import axios from "axios";

type VictoryPageProps = {
  bracket: MatchSet;
};

function VictoryPage({ bracket }: VictoryPageProps): React.JSX.Element {
  const winner = bracket[bracket.length - 1].trackOne;
  const numPlayers = bracket.length;

  return (
    <div id="victory-page">
      <div id="winner-display">
        <h1>Winner!</h1>
        <a href={`https://open.spotify.com/track/${winner?.id}`} target="_blank" rel="noreferrer">
          <img
            src={winner?.album.images[0] !== undefined ? winner.album.images[0].url : undefined}
            alt={winner?.name}
            width="200"
            height="200"
          ></img>
        </a>
        <a href={`https://open.spotify.com/track/${winner?.id}`} target="_blank" rel="noreferrer">
          <h4>{winner?.artists[0].name + " - " + winner?.name}</h4>
        </a>
      </div>

      <article id="container">
        {bracket.length >= 16 && (
          <section id="round-of-16">
            {roundToDivs(
              bracket.filter((match) => numPlayers / Math.pow(2, match.matchRound - 1) === 16),
            )}
          </section>
        )}

        <section id="round-of-8">
          {roundToDivs(
            bracket.filter((match) => numPlayers / Math.pow(2, match.matchRound - 1) === 8),
          )}
        </section>

        <section id="round-of-4">
          {roundToDivs(
            bracket.filter((match) => numPlayers / Math.pow(2, match.matchRound - 1) === 4),
          )}
        </section>

        <section id="final">
          {roundToDivs(
            bracket.filter((match) => numPlayers / Math.pow(2, match.matchRound - 1) === 2),
          )}
        </section>

        <section id="winner-round">
          <div>
            <img
              src={winner?.album.images[0] !== undefined ? winner.album.images[0].url : undefined}
              alt={winner?.name}
              width="40"
              height="40"
            ></img>
            <a
              className="songtitle"
              href={`https://open.spotify.com/track/${winner?.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {winner?.name}
            </a>
          </div>

          <span id="app-watermark">
            <img id="spotify-logo" src={spotifyLogo}></img>
            <h1 id="watermark">Madnessify</h1>
            <p id="watermark-link">seigfrieds.github.io/madnessify</p>
          </span>
        </section>
      </article>

      <button
        id="save-button"
        onClick={() => {
          const postBracket = async (): Promise<void> => {
            return axios.post(`${import.meta.env.VITE_API_URL}/api/bracket`, {
              userId: `${import.meta.env.VITE_TEMP_USER_ID}`,
              bracket: bracket.filter((match) => match.matchRound == 1),
            });
          };

          const postResult = async (bracketId: number): Promise<void> => {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/result`, {
              userId: `${import.meta.env.VITE_TEMP_USER_ID}`,
              bracketId: bracketId,
              bracket: bracket,
            });
          };

          postBracket().then((bracket) => postResult(bracket.data.id));
        }}
      >
        Save Result
      </button>

      {/* <button
        onClick={() => {
          const postBracket = async (): Promise<void> => {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/bracket`, {
              userId: `${import.meta.env.VITE_TEMP_USER_ID}`,
              bracket: bracket,
            });
          };

          postBracket();
        }}
      >
        Post Bracket
      </button> */}
    </div>
  );
}

export default VictoryPage;

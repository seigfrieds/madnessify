import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spotifyLogo from "../../../assets/Spotify_Logo_RGB_White.png";
import { roundToDivs } from "../Tournament/components/Victory/VictoryPage.logic";
import NotFound from "../../../components/404";
import "./Result.css";

function Result(): React.JSX.Element {
  const { resultId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const getAuthor = async (authorId: string): Promise<void> => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/${authorId}`)
        .then((res) => {
          setAuthorData(res.data);
        })
        .catch((err) => console.log(err.toJSON()));
    };
    const getResult = async (): Promise<void> => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/result/${resultId}`)
        .then((res) => {
          setResultData(res.data);
          getAuthor(res.data.user_id);
        })
        .catch((err) => console.log(err.toJSON()));
    };

    getResult();
  }, []);

  if (resultData === null) {
    return <NotFound />;
  } else {
    const bracket = resultData.bracket;
    const winner = bracket[bracket.length - 1].trackOne;
    const numPlayers = bracket.length;

    return (
      <div id="victory-page" className="result-page">
        <div className="bracket-header">
          <h1 className="result-title">{resultData?.title ?? "Untitled"}</h1>
          <div className="author-container">
            <img className="user-picture" src={authorData?.image_url}></img>
            <p>{authorData?.display_name ?? "Anonymous"}</p>
          </div>
        </div>
        <div className="winner-display">
          <h1>Winner!</h1>
          <div className="winner-song-display">
            <a
              href={`https://open.spotify.com/track/${winner?.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={winner?.album.images[0] !== undefined ? winner.album.images[0].url : undefined}
                alt={winner?.name}
                width="200"
                height="200"
              ></img>
            </a>
            <a
              href={`https://open.spotify.com/track/${winner?.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <h4>{winner?.artists[0].name + " - " + winner?.name}</h4>
            </a>
          </div>
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
      </div>
    );
  }
}

export default Result;

import React from "react";
import { MatchSet } from "../../../../types";

export function roundToDivs(matchesInRound: MatchSet): React.JSX.Element[] {
  const divArray = [];

  for (let i = 0; i < matchesInRound.length; i++) {
    const trackOne = matchesInRound[i].trackOne;
    const trackTwo = matchesInRound[i].trackTwo;

    divArray.push(
      <div key={trackOne?.id}>
        <img
          src={trackOne?.album.images[0] !== undefined ? trackOne.album.images[0].url : undefined}
          alt={trackOne?.name}
        ></img>

        <a
          className="songtitle"
          href={`https://open.spotify.com/track/${trackOne?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {trackOne?.name}
        </a>
        <span className="bracket-line-vertical"></span>
        <span className="bracket-line-horizontal"></span>
      </div>,
    );

    divArray.push(
      <div key={trackTwo?.id}>
        <img
          src={trackTwo?.album.images[0] !== undefined ? trackTwo.album.images[0].url : undefined}
          alt={trackTwo?.name}
        ></img>

        <a
          className="songtitle"
          href={`https://open.spotify.com/track/${trackTwo?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {trackTwo?.name}
        </a>
      </div>,
    );
  }

  return divArray;
}

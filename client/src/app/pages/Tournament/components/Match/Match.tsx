import React from "react";
import "./Match.css";
import Player from "./Player/Player";
import { Song } from "../../../../../types";

type Props = {
  matchId: number;
  trackOne: Song | null;
  trackTwo: Song | null;
  handleClick: (arg0: number, arg1: string) => void;
};

function Match({ matchId, trackOne, trackTwo, handleClick }: Props): React.JSX.Element {
  return (
    <div className="match">
      <div className="player">
        <Player
          id={trackOne?.id ?? "error"}
          artist={trackOne?.artists[0].name ?? "error"}
          title={trackOne?.name ?? "error"}
        />
        <button
          className="win-select-button"
          onClick={() => handleClick(matchId, trackOne?.id ?? "error")}
        >
          Select to win!
        </button>
      </div>

      <div className="player">
        <Player
          id={trackTwo?.id ?? "error"}
          artist={trackTwo?.artists[0].name ?? "error"}
          title={trackTwo?.name ?? "error"}
        />
        <button
          className="win-select-button"
          onClick={() => handleClick(matchId, trackTwo?.id ?? "error")}
        >
          Select to win!
        </button>
      </div>
    </div>
  );
}

export default Match;

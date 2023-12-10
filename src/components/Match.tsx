import React from "react";
import "./Match.css";
import Player from "./Player";
import WinSelectButton from "./WinSelectButton";
import { Song } from "../types/index";

type Props = {
  matchId: number;
  trackOne: Song;
  trackTwo: Song | null;
  handleClick: (arg0: number, arg1: string) => void;
};

function Match({ matchId, trackOne, trackTwo, handleClick }: Props): React.JSX.Element {
  return (
    <div className="match">
      <div className="player">
        <Player id={trackOne.id} artist={trackOne.artists[0].name} title={trackOne.name} />
        <WinSelectButton onClick={() => handleClick(matchId, trackOne.id)} />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="player">
        <Player
          id={trackTwo?.id ?? "error"}
          artist={trackTwo?.artists[0].name ?? "error"}
          title={trackTwo?.name ?? "error"}
        />
        <WinSelectButton onClick={() => handleClick(matchId, trackTwo?.id ?? "error")} />
      </div>
    </div>
  );
}

export default Match;

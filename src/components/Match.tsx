import React from "react";
import "./Match.css";
import Player from "./Player";
import WinSelectButton from "./WinSelectButton";

type Song = {
  id: string;
  artists: Array<{ name: string }>;
  name: string;
};

type Props = {
  matchId: number;
  trackOne: Song;
  trackTwo: Song;
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
        <Player id={trackTwo.id} artist={trackTwo.artists[0].name} title={trackTwo.name} />
        <WinSelectButton onClick={() => handleClick(matchId, trackTwo.id)} />
      </div>
    </div>
  );
}

export default Match;

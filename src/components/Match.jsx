import "./Match.css";
import Player from "./Player.tsx";
import WinSelectButton from "./WinSelectButton.tsx";

function Match({ matchId, trackOne, trackTwo, handleClick }) {
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

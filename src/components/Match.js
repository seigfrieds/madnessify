import "./Match.css";
import Player from "./Player.js";
import WinSelectButton from "./WinSelectButton";

function Match({currentRound, trackOne, trackTwo, handleClick})
{
    return (
        <div className="match">
            <p>{currentRound}</p>

            <div className="player">
                <Player id={trackOne.id} artist={trackOne.artists[0].name} title={trackOne.name}/>
                <WinSelectButton onClick={() => handleClick(0, trackOne.id)}/>
            </div>

            <div className="player">
                <Player id={trackTwo.id} artist={trackTwo.artists[0].name} title={trackTwo.name}/>
                <WinSelectButton onClick={() => handleClick(0, trackTwo.id)}/>
            </div>
        </div>
    );
}

export default Match;
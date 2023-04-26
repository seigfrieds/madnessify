import "./Match.css";
import Player from "./Player.js";

function Match({currentRound, trackOne, trackTwo})
{
    return (
        <div className="match">
            <p className="current-round">
                {currentRound}
            </p>

            <Player id={trackOne.id} artist={trackOne.artists[0].name} title={trackOne.name}/>
            <Player id={trackTwo.id} artist={trackTwo.artists[0].name} title={trackTwo.name}/>
        </div>
    );
}

export default Match;
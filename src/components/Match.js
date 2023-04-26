import "./Match.css";
import Player from "./Player.js";
import WinSelectButton from "./WinSelectButton";
import {useState} from 'react';

function Match({currentRound, trackOne, trackTwo})
{
    const [ winner, setWinner ] = useState(0);

    function handleClick(id) {
        setWinner(id);
    }

    return (
        <div className="match">
            <p>{currentRound}</p>

            <div className="player">
                <Player id={trackOne.id} artist={trackOne.artists[0].name} title={trackOne.name}/>
                <WinSelectButton onClick={() => handleClick(trackOne.id)}/>
            </div>

            <div className="player">
                <Player id={trackTwo.id} artist={trackTwo.artists[0].name} title={trackTwo.name}/>
                <WinSelectButton onClick={() => handleClick(trackTwo.id)}/>
            </div>

            <p>{winner}</p>
        </div>
    );
}

export default Match;
import Match from "./Match.js";
import {useState} from "react";

function initializeBracket(players, handleClick)
{
    let bracket = [];
    let matchIndex = 0;

    //push first round into matches 
    for (let i = 0; i < players.length; i+=2) 
    {
        let match = {
            matchId: matchIndex++,
            matchComponent: <Match 
                                currentRound={1}
                                trackOne={players[i]}
                                trackTwo={players[i+1]}
                                handleClick={handleClick}
                            />,
            matchWinnerId: null
        };

        bracket.push(match);
    }

    return bracket;
}

function Bracket({players})
{
    const [ bracket, setBracket ] = useState(initializeBracket(players, handleClick));
    const [ currMatchId, setCurrMatchId ] = useState(0);
    const [ nextMatchId, setNextMatchId ] = useState(1);

    function handleClick(matchId, winnerId)
    {
        const newBracket = bracket.map((m, i) => {
            if (i === matchId)
                return {
                    ...m,
                    matchWinnerId: winnerId
                };
            else 
                return m;
        });

        setBracket(newBracket);
        setCurrMatchId(nextMatchId);
        setNextMatchId(nextMatchId+1);
    }

    return (
        <>
            {console.log(bracket)}
            {console.log(currMatchId)}
            {bracket[0].matchComponent}
        </>
    );
}

export default Bracket;
import Match from "./Match.js";
import {useRef, useState} from "react";
import "./Bracket.css"

function initializeBracket(players, handleClick)
{
    let bracket = [];
    let matchIndex = 0;

    //push first round into matches 
    for (let i = 0; i < players.length; i+=2) 
    {
        let match = {
            matchRound: 1,
            matchComponent: <Match 
                                matchId={matchIndex++}
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
    const [ bracket, setBracket ] = useState(() => initializeBracket(players, handleClick));
    const bracketRef = useRef({});
    bracketRef.current = bracket;

    const [ currMatchId, setCurrMatchId ] = useState(0);
    const currMatchIdRef = useRef({});
    currMatchIdRef.current = currMatchId;

    const [ nextMatchId, setNextMatchId ] = useState(bracket.length);
    const nextMatchIdRef = useRef({});
    nextMatchIdRef.current = nextMatchId;

    function advanceMatchExists()
    {
        return bracketRef.current[nextMatchIdRef.current] !== undefined;
    }

    function advanceMatchIsSet()
    {
        return bracketRef.current[nextMatchIdRef.current].matchComponent.props.trackTwo !== null;
    }

    function addNextMatch(newBracket, matchId, winnerId)
    {
        if (!advanceMatchExists() || advanceMatchIsSet()) 
        {
            //add new match to bracket
            newBracket.push({
                matchRound: bracketRef.current[matchId].matchRound+1,
                matchComponent: <Match 
                                    matchId={nextMatchIdRef.current}
                                    trackOne={winnerId === bracketRef.current[matchId].matchComponent.props.trackOne.id
                                                ? bracketRef.current[matchId].matchComponent.props.trackOne
                                                : bracketRef.current[matchId].matchComponent.props.trackTwo}
                                    trackTwo={null}
                                    handleClick={handleClick}
                                />,
                matchWinnerId: null
            });

            if (advanceMatchExists() && advanceMatchIsSet())
                setNextMatchId(nextMatchId => nextMatchId+1);
        }
        //advance match is not set
        else
        {
            newBracket[nextMatchIdRef.current].matchComponent = 
                <Match 
                    matchId={nextMatchIdRef.current}
                    trackOne={bracketRef.current[nextMatchIdRef.current].matchComponent.props.trackOne}
                    trackTwo={winnerId === bracketRef.current[matchId].matchComponent.props.trackOne.id
                                ? bracketRef.current[matchId].matchComponent.props.trackOne
                                : bracketRef.current[matchId].matchComponent.props.trackTwo}
                    handleClick={handleClick}
                />;
        }

        return newBracket;
    }

    function handleClick(matchId, winnerId)
    {
        let newBracket = bracketRef.current.map((m, i) => {
            if (i === matchId)
                return {
                    ...m,
                    matchWinnerId: winnerId
                };
            else 
                return m;
        });

        newBracket = addNextMatch(newBracket, matchId, winnerId);

        setBracket(newBracket);
        setCurrMatchId(currMatchId => currMatchId+1);
    }

    return (
        <>
            {currMatchId !== players.length-1
                ?   <div>
                        <p className="round-display">
                            {bracket[currMatchId].matchRound}
                        </p>
                        {bracket[currMatchId].matchComponent}
                    </div>
                :   <p>Done!</p>}
        </>
    );
}

export default Bracket;
import Match from "./Match.js";
import {useRef, useState} from "react";
import "./Bracket.css"
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils/index.js";

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

//const Bracket = ({players}) =>
function Bracket({players})
{
    const [ bracket, setBracket ] = useState(() => initializeBracket(players, handleClick));
    const bracketRef = useRef({});
    bracketRef.current = bracket;
    const [ currMatchId, setCurrMatchId ] = useState(0);
    const [ nextMatchId, setNextMatchId ] = useState(bracket.length);

    function handleClick(matchId, winnerId)
    {
        console.log("STATE before process click on match: " + (matchId+1));
        console.log("\tbracket: ");
        console.log(bracketRef.current);
        console.log("\tcurrMatchId: " + (currMatchId+1));
        console.log("\tnextMatchId: " + (nextMatchId+1) + "\n\n\n\n");


        let newBracket = bracketRef.current.map((m, i) => {
            if (i === matchId)
                return {
                    ...m,
                    matchWinnerId: winnerId
                };
            else 
                return m;
        });

        if (bracketRef.current[nextMatchId] === undefined) 
        {
            newBracket.push({
                matchRound: bracketRef.current[matchId].matchRound+1,
                //store match component as object until you can actually create a whole match
                    //prevents errors with rendering!
                /*matchComponent: {
                                    matchId: nextMatchId,
                                    trackOne: winnerId === bracket[matchId].matchComponent.props.trackOne.id
                                                ? bracket[matchId].matchComponent.props.trackOne
                                                : bracket[matchId].matchComponent.props.trackTwo,
                                    trackTwo: null,
                                    handleClick: handleClick
                                },*/
                matchComponent: <Match 
                                    matchId={nextMatchId}
                                    trackOne={winnerId === bracketRef.current[matchId].matchComponent.props.trackOne.id
                                                ? bracketRef.current[matchId].matchComponent.props.trackOne
                                                : bracketRef.current[matchId].matchComponent.props.trackTwo}
                                    trackTwo={null}
                                    handleClick={handleClick}
                                />,
                matchWinnerId: null
            });

        }
        else if (bracketRef.current[nextMatchId].matchComponent.props.trackTwo === null) 
        {
            newBracket = newBracket.map((m, i) => {
                if (i === nextMatchId)
                    return {
                        ...m,
                        matchComponent: <Match 
                                            matchId={nextMatchId}
                                            trackOne={bracketRef.current[nextMatchId].matchComponent.props.trackOne}
                                            trackTwo={winnerId === bracket[matchId].matchComponent.props.trackOne.id
                                                        ? bracketRef.current[matchId].matchComponent.props.trackOne
                                                        : bracketRef.current[matchId].matchComponent.props.trackTwo}
                                            handleClick={handleClick}
                                        />
                    };
                else 
                    return m;
            });                                     
        }
        else 
        {
            newBracket.push({
                matchRound: bracketRef.current[matchId].matchRound+1,
                matchComponent: <Match 
                                    matchId={nextMatchId+1} 
                                    trackOne={winnerId === bracketRef.current[matchId].matchComponent.props.trackOne.id
                                                ? bracketRef.current[matchId].matchComponent.props.trackOne
                                                : bracketRef.current[matchId].matchComponent.props.trackTwo}
                                    trackTwo={null}
                                    handleClick={handleClick}
                                />,
                matchWinnerId: null
            });

            setNextMatchId(nextMatchId => nextMatchId+1);
        }

        setBracket(newBracket);
        setCurrMatchId(currMatchId => currMatchId+1);
    }

    return (
        <>
            {console.log("STATE when render match: " + (currMatchId+1))}
            {console.log("\tbracket: ")}
            {console.log(bracket)}
            {console.log("\tcurrMatchId: " + (currMatchId+1))}
            {console.log("\tnextMatchId: " + (nextMatchId+1) + "\n\n\n\n")}
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
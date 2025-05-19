import React, { useEffect } from "react";
import VictoryPage from "./components/Victory/VictoryPage";
import "./TournamentPage.css";
import { useLocation } from "react-router-dom";
import { useBracket } from "./hooks/useBracket";
import Match from "./components/Match/Match";

function TournamentPage(): React.JSX.Element {
  const { state } = useLocation();
  const { players } = state;
  const [bracket, currMatchId, handleClick] = useBracket(players);

  useEffect(() => {
    console.log(bracket);
  }, [bracket]);

  return (
    <>
      {currMatchId !== players.length - 1 ? (
        <div id="match-display">
          <h1 className="round-display">
            {"Round of " + players.length / Math.pow(2, bracket[currMatchId].matchRound - 1)}
          </h1>
          <Match
            matchId={currMatchId}
            trackOne={bracket[currMatchId].trackOne}
            trackTwo={bracket[currMatchId].trackTwo}
            handleClick={handleClick}
          ></Match>
        </div>
      ) : (
        <VictoryPage bracket={bracket} />
      )}
    </>
  );
}

export default TournamentPage;

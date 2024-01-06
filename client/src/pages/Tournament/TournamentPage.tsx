import React from "react";
import VictoryPage from "./components/Victory/VictoryPage";
import "./TournamentPage.css";
import { useLocation } from "react-router-dom";
import { useBracket } from "./hooks/useBracket";

function TournamentPage(): React.JSX.Element {
  const { state } = useLocation();
  const { players } = state;
  const [bracket, currMatchId] = useBracket(players);

  return (
    <>
      {currMatchId !== players.length - 1 ? (
        <div id="match-display">
          <h1 className="round-display">
            {"Round of " + players.length / Math.pow(2, bracket[currMatchId].matchRound - 1)}
          </h1>
          {bracket[currMatchId].matchComponent}
        </div>
      ) : (
        <VictoryPage bracket={bracket} />
      )}
    </>
  );
}

export default TournamentPage;

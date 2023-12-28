import React from "react";
import { Song, MatchSet, MatchType } from "../../../types";
import { useState, useRef } from "react";
import Match from "../components/Match/Match";

type initializeBracketProps = {
  players: Array<Song>;
  handleClick: (arg0: number, arg1: string) => void;
};

function initializeBracket({ players, handleClick }: initializeBracketProps): MatchSet {
  const bracket = [];
  let matchIndex = 0;

  //push first round into matches
  for (let i = 0; i < players.length; i += 2) {
    const match = {
      matchRound: 1,
      matchComponent: (
        <Match
          matchId={matchIndex++}
          trackOne={players[i]}
          trackTwo={players[i + 1]}
          handleClick={handleClick}
        />
      ),
      matchWinnerId: null,
    };
    bracket.push(match);
  }

  return bracket;
}

const advanceMatchExists = (match: MatchType): boolean => {
  return match !== undefined;
};

const advanceMatchIsSet = (match: MatchType): boolean => {
  return match.matchComponent.props.trackTwo !== null;
};

export function useBracket(players: Array<Song>): [MatchSet, number] {
  const [currMatchId, setCurrMatchId] = useState(0); //has to be in state -> will cause the rerenders
  const bracket = useRef(initializeBracket({ players, handleClick }));
  const nextMatchId = useRef(bracket.current.length);

  function addNextMatch(newBracket: MatchSet, matchId: number, winnerId: string): MatchSet {
    const nextMatch = bracket.current[nextMatchId.current];

    if (!advanceMatchExists(nextMatch) || advanceMatchIsSet(nextMatch)) {
      //add new match to bracket
      newBracket.push({
        matchRound: bracket.current[matchId].matchRound + 1,
        matchComponent: (
          <Match
            matchId={nextMatchId.current}
            trackOne={
              winnerId === bracket.current[matchId].matchComponent.props.trackOne.id
                ? bracket.current[matchId].matchComponent.props.trackOne
                : bracket.current[matchId].matchComponent.props.trackTwo
            }
            trackTwo={null}
            handleClick={handleClick}
          />
        ),
        matchWinnerId: null,
      });

      if (advanceMatchExists(nextMatch) && advanceMatchIsSet(nextMatch)) nextMatchId.current++;
    }
    //advance match is not set
    else {
      newBracket[nextMatchId.current].matchComponent = (
        <Match
          matchId={nextMatchId.current}
          trackOne={bracket.current[nextMatchId.current].matchComponent.props.trackOne}
          trackTwo={
            winnerId === bracket.current[matchId].matchComponent.props.trackOne.id
              ? bracket.current[matchId].matchComponent.props.trackOne
              : bracket.current[matchId].matchComponent.props.trackTwo
          }
          handleClick={handleClick}
        />
      );
    }

    return newBracket;
  }

  function handleClick(matchId: number, winnerId: string): void {
    let newBracket = bracket.current.map((m, i) => {
      if (i === matchId)
        return {
          ...m,
          matchWinnerId: winnerId,
        };
      else return m;
    });

    newBracket = addNextMatch(newBracket, matchId, winnerId);

    bracket.current = newBracket;
    setCurrMatchId((prev) => prev + 1);
  }

  return [bracket.current, currMatchId];
}

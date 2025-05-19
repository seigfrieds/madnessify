import React from "react";
import { Song, MatchSet, MatchType } from "../../../types";
import { useState, useRef } from "react";
import Match from "../components/Match/Match";

type initializeBracketProps = {
  players: Array<Song>;
};

function initializeBracket({ players }: initializeBracketProps): MatchSet {
  const bracket = [];
  let matchIndex = 0;

  //push first round into matches
  for (let i = 0; i < players.length; i += 2) {
    const match = {
      matchRound: 1,
      matchId: matchIndex++,
      trackOne: players[i],
      trackTwo: players[i + 1],
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
  return match.trackTwo !== null;
};

export function useBracket(
  players: Array<Song>,
): [MatchSet, number, (arg0: number, arg1: string) => void] {
  const [currMatchId, setCurrMatchId] = useState(0); //has to be in state -> will cause the rerenders
  const bracket = useRef(initializeBracket({ players }));
  const nextMatchId = useRef(bracket.current.length);

  function addNextMatch(newBracket: MatchSet, matchId: number, winnerId: string): MatchSet {
    const nextMatch = bracket.current[nextMatchId.current];

    if (!advanceMatchExists(nextMatch) || advanceMatchIsSet(nextMatch)) {
      //add new match to bracket
      newBracket.push({
        matchRound: bracket.current[matchId].matchRound + 1,
        matchId: nextMatchId.current,
        trackOne:
          winnerId === bracket.current[matchId].trackOne?.id
            ? bracket.current[matchId].trackOne
            : bracket.current[matchId].trackTwo,
        trackTwo: null,
        matchWinnerId: null,
      });

      if (advanceMatchExists(nextMatch) && advanceMatchIsSet(nextMatch)) nextMatchId.current++;
    }
    //advance match is not set
    else {
      newBracket[nextMatchId.current].trackTwo =
        winnerId === bracket.current[matchId].trackOne?.id
          ? bracket.current[matchId].trackOne
          : bracket.current[matchId].trackTwo;
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

  return [bracket.current, currMatchId, handleClick];
}

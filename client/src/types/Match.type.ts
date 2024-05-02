import { Song } from "./Song.type";

type MatchType = {
  matchRound: number;
  matchId: number;
  trackOne: Song | null;
  trackTwo: Song | null;
  matchWinnerId: string | null;
};

export { MatchType };

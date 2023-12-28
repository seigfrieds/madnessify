import { getTopTracks, getPlaylistTracks } from "./services/spotifyService/spotifyService";
import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";

type QueryData = {
  spotifyToken?: string;
  query?: string;
  numTracks?: number;
  timeFrame?: string;
  playlistLink?: string;
};

async function getTracks({
  spotifyToken,
  query,
  numTracks,
  timeFrame,
  playlistLink,
}: QueryData): Promise<void> {
  if (spotifyToken) {
    switch (query) {
      case "top_tracks":
        return getTopTracks(spotifyToken, numTracks, timeFrame);
      case "playlist":
        return getPlaylistTracks(spotifyToken, numTracks, playlistLink);
    }
  }
}

export const handleSubmit = (
  event: FormEvent<HTMLFormElement>,
  spotifyToken: string,
  navigate: NavigateFunction,
): void => {
  event.preventDefault();

  const target = event.currentTarget;

  const query = {
    spotifyToken: spotifyToken,
    query: target.queryselect?.value,
    numTracks: Number(target.numsongsselect?.value),
    timeFrame: target.timeframeselect?.value,
    playlistLink: target.playlistbox?.value,
  };

  getTracks(query).then((result: any) => {
    if (result) navigate("/tournament", { state: { players: result } });
  });
};

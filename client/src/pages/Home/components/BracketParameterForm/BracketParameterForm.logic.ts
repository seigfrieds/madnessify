import { getTopTracks, getPlaylistTracks } from "../../services/spotifyService";
import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";

type QueryData = {
  query?: string;
  numTracks?: number;
  timeFrame?: string;
  playlistLink?: string;
};

async function getTracks({ query, numTracks, timeFrame, playlistLink }: QueryData): Promise<void> {
  switch (query) {
    case "top_tracks":
      return getTopTracks(numTracks, timeFrame);
    case "playlist":
      return getPlaylistTracks(numTracks, playlistLink);
  }
}

export const handleSubmit = (
  event: FormEvent<HTMLFormElement>,
  navigate: NavigateFunction,
): void => {
  event.preventDefault();

  const target = event.currentTarget;

  const query = {
    query: target.queryselect?.value,
    numTracks: Number(target.numsongsselect?.value),
    timeFrame: target.timeframeselect?.value,
    playlistLink: target.playlistbox?.value,
  };

  getTracks(query).then((result: any) => {
    console.log(result);
    if (result) navigate("/tournament", { state: { players: result } });
  });
};

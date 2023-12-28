import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { getTopTracks, getPlaylistTracks } from "../services/spotifyService/spotifyService";

type QueryData = {
  query?: string;
  numTracks?: number;
  timeFrame?: string;
  playlistLink?: string;
};

export function useBracketParameterForm() {
  const { state } = useLocation();
  const { token } = state;
  const navigate = useNavigate();

  async function getTracks(
    token: string,
    { query, numTracks, timeFrame, playlistLink }: QueryData,
  ): Promise<void> {
    switch (query) {
      case "top_tracks":
        return getTopTracks(token, numTracks, timeFrame);
      case "playlist":
        return getPlaylistTracks(token, numTracks, playlistLink);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const target = event.currentTarget;

    const data = {
      query: target.queryselect?.value,
      numTracks: Number(target.numsongsselect?.value),
      timeFrame: target.timeframeselect?.value,
      playlistLink: target.playlistbox?.value,
    };

    getTracks(token, data).then((result: any) => {
      if (result) navigate("/tournament", { state: { players: result } });
    });
  };

  return [handleSubmit];
}

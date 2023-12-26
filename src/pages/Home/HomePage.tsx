import React, { FormEvent } from "react";
import BracketParameterForm from "./BracketParameterForm/BracketParameterForm";
import { useNavigate, useLocation } from "react-router-dom";
import { getPlaylistTracks, getTopTracks } from "./spotifyService";

type QueryData = {
  query?: string;
  numTracks?: number;
  timeFrame?: string;
  playlistLink?: string;
};

export default function HomePage(): React.JSX.Element {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
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
  }

  return <BracketParameterForm handleSubmit={handleSubmit} />;
}

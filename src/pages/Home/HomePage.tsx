import React, { useState, FormEvent, ChangeEvent, ReactElement } from "react";
import BracketParameterForm from "./BracketParameterForm/BracketParameterForm";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Song } from "../../types";

type QueryData = {
  query?: string;
  numTracks?: number;
  timeFrame?: string;
  playlistLink?: string;
};

//durstenfeld shuffle: https://stackoverflow.com/a/12646864
const shuffleArray = (array: Array<any>): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default function HomePage(): React.JSX.Element {
  const { state } = useLocation();
  const { token } = state;
  const navigate = useNavigate();

  async function getTopTracks(
    token: string,
    numTracks: number | undefined,
    timeFrame: string | undefined,
  ): Promise<void> {
    if (numTracks && timeFrame) {
      const request = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          limit: numTracks,
          time_range: timeFrame,
        },
      });

      shuffleArray(request.data.items);

      return request.data.items;
    }
  }

  async function getPlaylistSize(playlistId: string) {
    const req = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        fields: "tracks",
      },
    });

    return req.data.tracks.total;
  }

  async function getPlaylistTracks(
    token: string,
    numTracks: number | undefined,
    playlistLink: string | undefined,
  ): Promise<void> {
    if (numTracks && playlistLink) {
      const PLAYLIST_ID = playlistLink.split("/playlist/")[1].split("?si=")[0];

      let playlistSize = 0;
      await getPlaylistSize(PLAYLIST_ID).then((result) => {
        playlistSize = result;
      });

      if (playlistSize < numTracks) {
        alert(`Error: Playlist does not have ${numTracks} tracks`);
      } else {
        const startingPosition = Math.floor(Math.random() * playlistSize - 100);

        const selectedSection = await axios.get(
          `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?offset=${
            startingPosition > 0 ? startingPosition : 0
          }&limit=100&locale=en-US,en;q=0.9`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        shuffleArray(selectedSection.data.items);

        return selectedSection.data.items
          .slice(0, numTracks)
          .map((item: { track: Song }) => item.track);
      }
    }
  }

  async function getTracks(token: string, data: QueryData): Promise<void> {
    if (data.query === "top_tracks") {
      return getTopTracks(token, data.numTracks, data.timeFrame);
    } else if (data.query === "playlist") {
      return getPlaylistTracks(token, data.numTracks, data.playlistLink);
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

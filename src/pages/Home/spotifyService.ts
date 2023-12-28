import axios from "axios";
import { shuffleArray } from "./shuffle";
import { Song } from "../../types";

export async function getTopTracks(
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

export async function getPlaylistTracks(
  token: string,
  numTracks: number | undefined,
  playlistLink: string | undefined,
): Promise<void> {
  if (numTracks && playlistLink) {
    const PLAYLIST_ID = playlistLink.split("/playlist/")[1].split("?si=")[0];

    let playlistSize = 0;
    await getPlaylistSize(token, PLAYLIST_ID).then((result) => {
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

async function getPlaylistSize(token: string, playlistId: string) {
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

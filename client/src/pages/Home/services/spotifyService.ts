import axios from "axios";

export async function searchTracks(query: string | undefined): Promise<void> {
  if (query) {
    const tracks = await axios.get(`${import.meta.env.VITE_API_URL}/spotify/searchTracks`, {
      withCredentials: true,
      params: {
        search: query,
      },
    });

    return tracks.data;
  }
}

export async function getTopTracks(
  numTracks: number | undefined,
  timeFrame: string | undefined,
): Promise<void> {
  if (numTracks && timeFrame) {
    const tracks = await axios.get(`${import.meta.env.VITE_API_URL}/spotify/getTopTracks`, {
      withCredentials: true,
      params: {
        numTracks: numTracks,
        timeFrame: timeFrame,
      },
    });

    return tracks.data;
  }
}

export async function getPlaylistTracks(
  numTracks: number | undefined,
  playlistLink: string | undefined,
): Promise<void> {
  if (numTracks && playlistLink) {
    const tracks = await axios.get(`${import.meta.env.VITE_API_URL}/spotify/getPlaylistTracks`, {
      withCredentials: true,
      params: {
        numTracks: numTracks,
        playlistLink: playlistLink,
      },
    });

    return tracks.data;
  }
}

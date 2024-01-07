import axios from "axios";

const getPlaylistSize = async (token, playlistId) => {
  const req = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      fields: "tracks",
    },
  });

  return req.data.tracks.total;
};

export default getPlaylistSize;

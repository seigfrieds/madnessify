import axios from "axios";
import redis from "../redis.js";

//durstenfeld shuffle: https://stackoverflow.com/a/12646864
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getTopTracks = async (req, res) => {
  const accessToken = await redis.get(req.session);
  const numTracks = req.query.numTracks;
  const timeFrame = req.query.timeFrame;

  if (numTracks && timeFrame) {
    const spotifyApi = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        limit: numTracks,
        time_range: timeFrame,
      },
    });

    shuffleArray(spotifyApi.data.items);

    res.status(200).json(spotifyApi.data.items);
  }
};

const getPlaylistTracks = async (req, res) => {
  const accessToken = await redis.get(req.session);
  const numTracks = req.query.numTracks;
  const playlistLink = req.query.playlistLink;

  if (numTracks && playlistLink) {
    const PLAYLIST_ID = playlistLink.split("/playlist/")[1].split("?si=")[0];

    let playlistSize = 0;
    await getPlaylistSize(accessToken, PLAYLIST_ID).then((result) => {
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
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      shuffleArray(selectedSection.data.items);

      res
        .status(200)
        .json(selectedSection.data.items.slice(0, numTracks).map((item) => item.track));
    }
  }
};

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

export { getTopTracks, getPlaylistTracks };

import axios from "axios";
import cache from "../redis.js";
import shuffleArray from "../utils/shuffleArray.js";
import getPlaylistSize from "../helpers/getPlaylistSize.js";

const searchTracks = async (req, res) => {
  const accessToken = await cache.get(req.session);
  const search = req.query.search.split(" ").join("+");

  const spotifyApi = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    params: {
      query: search,
      limit: 10,
      type: "track",
    },
  });

  res.status(200).json(
    spotifyApi.data.tracks.items.map((track) => ({
      artist: track.artists[0].name,
      name: track.name,
      id: track.id,
    }))
  );
};

const searchAlbums = async (req, res) => {
  const accessToken = await cache.get(req.session);
  const search = req.query.search.split(" ").join("+");

  const spotifyApi = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    params: {
      query: search,
      limit: 10,
      type: "album",
    },
  });

  res.status(200).json(
    spotifyApi.data.albums.items.map((album) => ({
      artist: album.artists[0].name,
      name: album.name,
      id: album.id,
    }))
  );
};

const getTopTracks = async (req, res) => {
  const accessToken = await cache.get(req.session);
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
  const accessToken = await cache.get(req.session);
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

export { getTopTracks, getPlaylistTracks, searchTracks, searchAlbums };

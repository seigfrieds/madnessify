import {
  searchTracks,
  searchAlbums,
  getTopTracks,
  getPlaylistTracks,
} from "../../services/spotifyService";
import { handleSubmit } from "./BracketParameterForm.logic";
import "./BracketParameterForm.css";
import React, { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import { useNavigate } from "react-router-dom";
import List from "../List";
import { Song } from "../../../../types";

function BracketParameterForm(): React.JSX.Element {
  const [currQuery, setCurrQuery] = useState(null);
  const [tracks, setTracks] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState();
  const [timeFrame, setTimeFrame] = useState();
  const [playlistLink, setPlaylistLink] = useState();
  const [numTracks, setNumTracks] = useState<number>();
  const navigate = useNavigate();

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    searchFnc: (query: string) => Promise<void>,
  ): void => {
    const query = e.target.value;

    if (query.length === 0) {
      setSearchResults(null);
    } else {
      searchFnc(e.target.value).then((res) => {
        setSearchResults(res);
      });
    }
  };

  const onItemClick = (e: React.MouseEvent): void => {
    const song = e.currentTarget.getAttribute("value");

    setTracks((prev) => [...prev, JSON.parse(song)]);
  };

  function changeQuery(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCurrQuery(event.target.value);
    setTimeFrame("short_term");
    setNumTracks(8);
    setPlaylistLink("");
    setSearchResults(null);
    setTracks([]);
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tracks?.length !== 8 && tracks?.length !== 16 && tracks?.length !== 32) {
      window.alert("Error! You must select either 8, 16, or 32 tracks!");
    } else {
      navigate("/tournament", { state: { players: tracks } });
    }
  };

  useEffect(() => {
    const fetchTopTracks = async (): Promise<void> => {
      await getTopTracks(numTracks, timeFrame).then((result: any) => {
        setTracks(result);
      });
    };

    const fetchPlaylistTracks = async (): Promise<void> => {
      await getPlaylistTracks(numTracks, playlistLink).then((result: any) => {
        setTracks(result);
      });
    };

    if (currQuery === "top_tracks" && numTracks && timeFrame) {
      fetchTopTracks();
    } else if (currQuery === "playlist" && numTracks && playlistLink) {
      fetchPlaylistTracks();
    }
  }, [numTracks, timeFrame, playlistLink]);

  return (
    <div className="FormScreen">
      <div className="bracket-options">
        <div className="dropdown">
          <label htmlFor="query-select">Select where you want your songs to come from!</label>
          <select onChange={changeQuery} id="query-select" name="queryselect">
            <option value="" selected disabled hidden>
              Choose...
            </option>
            <option value={"top_tracks"}>Top Tracks</option>
            <option value={"playlist"}>Playlist</option>
            <option value={"custom_tracks"}>Search for Tracks</option>
            {/* <option value={"custom_album"}>Search for Albums</option> */}
          </select>
        </div>

        <form onSubmit={(e) => onSubmit(e)} id="theform">
          {currQuery === "top_tracks" && (
            <>
              <div className="dropdown">
                <label htmlFor="num-songs-select">Select the number of songs: </label>
                <select
                  onChange={(e) => {
                    setNumTracks(e.target.value);
                  }}
                  id="num-songs-select"
                  name="numsongsselect"
                  value={numTracks}
                >
                  <option selected value={8}>
                    Top 8 songs
                  </option>
                  <option value={16}>Top 16 songs</option>
                  <option value={32}>Top 32 songs</option>
                </select>
              </div>

              <div className="dropdown">
                <label htmlFor="time-frame-select">Select the time frame: </label>
                <select
                  onChange={(e) => {
                    setTimeFrame(e.target.value);
                  }}
                  id="time-frame-select"
                  name="timeframeselect"
                  value={timeFrame}
                >
                  <option selected value={"short_term"}>
                    Past 4 weeks
                  </option>
                  <option value={"medium_term"}>Past 6 months</option>
                  <option value={"long_term"}>Past several years</option>
                </select>
              </div>
            </>
          )}

          {currQuery === "playlist" && (
            <>
              <div id="prompt">
                <label htmlFor="prompt">Enter the link to your playlist:</label>
                <input
                  onChange={(e) => {
                    setPlaylistLink(e.target.value);
                  }}
                  type="text"
                  id="playlist-box"
                  name="playlistbox"
                  value={playlistLink}
                ></input>
              </div>

              <div className="dropdown">
                <label htmlFor="num-songs-select">Select the number of songs: </label>
                <select
                  onChange={(e) => {
                    setNumTracks(e.target.value);
                  }}
                  id="num-songs-select"
                  name="numsongsselect"
                  value={numTracks}
                >
                  <option selected value={8}>
                    8 random songs
                  </option>
                  <option value={16}>16 random songs</option>
                  <option value={32}>32 random songs</option>
                </select>
              </div>
            </>
          )}

          {currQuery === "custom_tracks" && (
            <>
              <div className="user-search">
                <SearchBox onChange={(e) => onInputChange(e, searchTracks)}></SearchBox>
                <List items={searchResults} onItemClick={onItemClick} />
              </div>
            </>
          )}

          {currQuery === "custom_album" && (
            <>
              <div className="user-search">
                <SearchBox onChange={(e) => onInputChange(e, searchAlbums)}></SearchBox>
                <List items={searchResults} onItemClick={onItemClick} />
              </div>
            </>
          )}

          <button id="submit-button" type="submit">
            Submit!
          </button>
        </form>
      </div>
      <div className="tracks-display">
        <p className="tracks-display-title">Tracks</p>
        {tracks.length > 0 &&
          tracks.map((track, index) => (
            <div className="track">
              <img
                src={track.album.images[0] !== undefined && track.album.images[0].url}
                alt={track.name}
              ></img>
              <p>{track.artists[0].name + " - " + track.name}</p>
              {currQuery === "custom_tracks" && (
                <button
                  onClick={() => {
                    const newTracks = tracks.filter((t, i) => i !== index);
                    setTracks(newTracks);
                  }}
                  style={{ borderRadius: "2.5em", border: "2px solid grey" }}
                >
                  X
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default BracketParameterForm;

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
  const [currQuery, setCurrQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [tracks, setTracks] = useState<Song[]>([]);
  const [timeFrame, setTimeFrame] = useState("short_term");
  const [playlistLink, setPlaylistLink] = useState("");
  const [numTracks, setNumTracks] = useState<number>(-1);
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

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const onItemClick = (e: React.MouseEvent): void => {
    const song = e.currentTarget.getAttribute("value");

    setTracks((prev) => [...prev, JSON.parse(song)]);
  };

  function changeQuery(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCurrQuery(event.target.value);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tracks?.length > 0) {
      navigate("/tournament", { state: { players: tracks } });
    }
  };

  useEffect(() => {
    console.log("currQuery changed");
    setNumTracks(8);
    setTimeFrame("short_term");
    setPlaylistLink("");
    setSearchResults(null);
  }, [currQuery]);

  useEffect(() => {
    console.log("numTracks/timeFrame changed (top_tracks)");
    const fetchAPI = async (): Promise<void> => {
      getTopTracks(numTracks, timeFrame).then((result: any) => {
        setTracks(result);
      });
    };

    if (currQuery === "top_tracks" && numTracks && timeFrame) {
      fetchAPI();
    }
  }, [numTracks, timeFrame]);

  useEffect(() => {
    console.log("numTracks/playlistLink changed (playlist)");
    const fetchAPI = async (): Promise<void> => {
      getPlaylistTracks(numTracks, playlistLink).then((result: any) => {
        setTracks(result);
      });
    };

    if (currQuery === "playlist" && numTracks && playlistLink) {
      fetchAPI();
    }
  }, [numTracks, playlistLink]);

  return (
    <div className="FormScreen">
      <div className="dropdown">
        <label htmlFor="query-select">Select where you want your songs to come from!</label>
        <select onChange={changeQuery} id="query-select" name="queryselect">
          <option value="" selected disabled hidden>
            Choose...
          </option>
          <option value={"top_tracks"}>Top Tracks</option>
          <option value={"playlist"}>Playlist</option>
          <option value={"custom_tracks"}>Search for Tracks</option>
          <option value={"custom_album"}>Search for Albums</option>
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
            <SearchBox onChange={(e) => onInputChange(e, searchTracks)}></SearchBox>
            <List items={searchResults} onItemClick={onItemClick} />
          </>
        )}

        {currQuery === "custom_album" && (
          <>
            <SearchBox onChange={(e) => onInputChange(e, searchAlbums)}></SearchBox>
            <List items={searchResults} onItemClick={onItemClick} />
          </>
        )}

        <button id="submit-button" type="submit">
          Submit!
        </button>
      </form>
    </div>
  );
}

export default BracketParameterForm;

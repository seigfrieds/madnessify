import {
  searchTracks,
  searchAlbums,
  getTopTracks,
  getPlaylistTracks,
} from "../../services/spotifyService";
import { handleSubmit } from "./BracketParameterForm.logic";
import "./BracketParameterForm.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "../List/List";
import { Song } from "../../../../types";
import Input from "./Input";
import Select from "./Select";

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
          <Select
            label="Select where you want your songs to come from!"
            options={["Choose...", "Top Tracks", "Playlist", "Search for Tracks"]}
            optionValues={["", "top_tracks", "playlist", "custom_tracks"]}
            optionModifiers={[["selected", "disabled", "hidden"], [], [], []]}
            onChange={changeQuery}
          />
        </div>

        <form onSubmit={(e) => onSubmit(e)} id="theform">
          {currQuery === "top_tracks" && (
            <>
              <div className="dropdown">
                <Select
                  label="Select the number of songs:"
                  options={["Top 8 songs", "Top 16 songs", "Top 32 songs"]}
                  optionValues={[8, 16, 32]}
                  onChange={(e) => {
                    setNumTracks(e.target.value);
                  }}
                />
              </div>

              <div className="dropdown">
                <Select
                  label="Select the time frame:"
                  options={["Past 4 weeks", "Past 6 months", "Past several years"]}
                  optionValues={["short_term", "medium_term", "long_term"]}
                  onChange={(e) => {
                    setTimeFrame(e.target.value);
                  }}
                />
              </div>
            </>
          )}

          {currQuery === "playlist" && (
            <>
              <div className="prompt">
                <Input
                  label="Enter the link to your playlist:"
                  onChange={(e) => {
                    setPlaylistLink(e.target.value);
                  }}
                  onFocus={() => {}}
                ></Input>
              </div>

              <div className="dropdown">
                <Select
                  label="Select the number of songs:"
                  options={["8 random songs", "16 random songs", "32 random songs"]}
                  optionValues={[8, 16, 32]}
                  onChange={(e) => {
                    setNumTracks(e.target.value);
                  }}
                />
              </div>
            </>
          )}

          {currQuery === "custom_tracks" && (
            <>
              <div className="prompt">
                <Input
                  label="Search for a track:"
                  onChange={(e) => onInputChange(e, searchTracks)}
                  onFocus={() => {}}
                ></Input>
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

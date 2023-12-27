import "./BracketParameterForm.css";
import React, { useState } from "react";

type Props = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

function BracketParameterForm({ handleSubmit }: Props): React.JSX.Element {
  const [currQuery, setCurrQuery] = useState("");

  function changeQuery(event: React.ChangeEvent<HTMLSelectElement>): void {
    setCurrQuery(event.target.value);
  }

  return (
    <div className="FormScreen">
      <form onSubmit={handleSubmit} id="theform">
        <div className="dropdown">
          <label htmlFor="query-select">Select where you want your songs to come from!</label>
          <select onChange={changeQuery} id="query-select" name="queryselect">
            <option value="" selected disabled hidden>
              Choose...
            </option>
            <option value={"top_tracks"}>Top Tracks</option>
            <option value={"playlist"}>Playlist</option>
          </select>
        </div>

        {currQuery === "top_tracks" && (
          <>
            <div className="dropdown">
              <label htmlFor="num-songs-select">Select the number of songs: </label>
              <select id="num-songs-select" name="numsongsselect">
                <option selected value={8}>
                  Top 8 songs
                </option>
                <option value={16}>Top 16 songs</option>
                <option value={32}>Top 32 songs</option>
              </select>
            </div>

            <div className="dropdown">
              <label htmlFor="time-frame-select">Select the time frame: </label>
              <select id="time-frame-select" name="timeframeselect">
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
            <div id="playlist-prompt">
              <label htmlFor="playlist-prompt">Enter the link to your playlist:</label>
              <input type="text" id="playlist-box" name="playlistbox"></input>
            </div>

            <div className="dropdown">
              <label htmlFor="num-songs-select">Select the number of songs: </label>
              <select id="num-songs-select" name="numsongsselect">
                <option selected value={8}>
                  8 random songs
                </option>
                <option value={16}>16 random songs</option>
                <option value={32}>32 random songs</option>
              </select>
            </div>
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

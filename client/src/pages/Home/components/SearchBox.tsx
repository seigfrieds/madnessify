import "./SearchBox.css";
import React, { ReactElement, useState } from "react";

type Props = {
  searchFnc: (query: string) => Promise<void>;
  mapFnc: (item: any) => ReactElement;
};

function SearchBox({ searchFnc, mapFnc }: Props): React.JSX.Element {
  const [searchResults, setSearchResults] = useState(null);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;

    if (query.length === 0) {
      setSearchResults(null);
    } else {
      searchFnc(event.target.value).then((res) => {
        setSearchResults(res);
      });
    }
  };

  return (
    <>
      <div id="prompt">
        <label htmlFor="prompt">Search for a track:</label>
        <input type="text" id="playlist-box" name="playlistbox" onChange={onSearchChange}></input>
        <ul id="search-results">{searchResults != null && searchResults.map(mapFnc)}</ul>
      </div>
    </>
    //
  );
}

export default SearchBox;

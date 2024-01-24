import "./SearchBox.css";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  searchFnc: (query: string) => Promise<void>;
  mapFnc: (item: any) => React.ReactElement;
};

function SearchBox({ searchFnc, mapFnc }: Props): React.JSX.Element {
  const [searchResults, setSearchResults] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLInputElement>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;

    if (query.length === 0) {
      setSearchResults(null);
    } else {
      searchFnc(e.target.value).then((res) => {
        setSearchResults(res);
      });
    }
  };

  const handleClickOnSearch = (e: React.MouseEvent<HTMLElement>): void => {
    const clickedInSearchBox = inputRef.current?.contains(e.target as HTMLElement);

    if (clickedInSearchBox && resultsRef.current) {
      resultsRef.current.classList.remove("hidden");
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLElement>): void => {
    const clickedOutsideSearch = !promptRef.current?.contains(e.target as HTMLElement);

    if (clickedOutsideSearch && resultsRef.current) {
      resultsRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOnSearch);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOnSearch);
    };
  }, []);

  return (
    <>
      <label htmlFor="prompt">Search for a track:</label>
      <div ref={promptRef} id="prompt">
        <input
          ref={inputRef}
          type="text"
          id="playlist-box"
          name="playlistbox"
          onChange={onSearchChange}
        ></input>
        <ul ref={resultsRef} id="search-results">
          {searchResults != null && searchResults.map(mapFnc)}
        </ul>
      </div>
    </>
    //
  );
}

export default SearchBox;

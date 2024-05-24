import List from "../List/List";
import "./SearchBox.css";
import React, { useEffect, useRef } from "react";

type Props = {
  onChange: (...args: any[]) => any;
};

function SearchBox({ onChange }: Props): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLInputElement>(null);

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
          onChange={onChange}
        ></input>
      </div>
    </>
    //
  );
}

export default SearchBox;

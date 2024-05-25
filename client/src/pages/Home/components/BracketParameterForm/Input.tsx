import React from "react";
import "./Input.css";

type InputProps = {
  label: string;
  onChange: (e: any) => void;
  onFocus: () => void;
};

function Input({ label, onChange, onFocus }: InputProps): React.JSX.Element {
  return (
    <>
      <label htmlFor="prompt">{label}</label>
      <div id="prompt">
        <input
          type="text"
          id="playlist-box"
          name="playlistbox"
          onChange={onChange}
          onFocus={onFocus}
        ></input>
      </div>
    </>
  );
}

export default Input;

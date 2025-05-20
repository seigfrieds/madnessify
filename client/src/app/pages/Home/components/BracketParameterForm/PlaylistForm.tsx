import React from "react";
import Input from "./Input";
import Select from "./Select";

type PlaylistFormProps = {
  setNumTracks: (e: any) => void;
  setPlaylistLink: (e: any) => void;
  onSubmit: (e: any) => void;
};

function PlaylistForm({
  setNumTracks,
  setPlaylistLink,
  onSubmit,
}: PlaylistFormProps): React.JSX.Element {
  return (
    <form onSubmit={onSubmit} id="theform">
      <div className="prompt">
        <Input
          label="Enter the link to your playlist:"
          onChange={setPlaylistLink}
          onFocus={() => {}}
        ></Input>
      </div>

      <div className="dropdown">
        <Select
          label="Select the number of songs:"
          options={["8 random songs", "16 random songs", "32 random songs"]}
          optionValues={[8, 16, 32]}
          onChange={setNumTracks}
        />
      </div>
      <button id="submit-button" type="submit">
        Submit!
      </button>
    </form>
  );
}

export default PlaylistForm;

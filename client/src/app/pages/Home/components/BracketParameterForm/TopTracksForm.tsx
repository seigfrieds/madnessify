import React from "react";
import Select from "./Select";

type TopTracksFormProps = {
  setNumTracks: (e: any) => void;
  setTimeFrame: (e: any) => void;
  onSubmit: (e: any) => void;
};

function TopTracksForm({
  setNumTracks,
  setTimeFrame,
  onSubmit,
}: TopTracksFormProps): React.JSX.Element {
  return (
    <form onSubmit={onSubmit} id="theform">
      <div className="dropdown">
        <Select
          label="Select the number of songs:"
          options={["Top 8 songs", "Top 16 songs", "Top 32 songs"]}
          optionValues={[8, 16, 32]}
          onChange={setNumTracks}
        />
      </div>
      <div className="dropdown">
        <Select
          label="Select the time frame:"
          options={["Past 4 weeks", "Past 6 months", "Past several years"]}
          optionValues={["short_term", "medium_term", "long_term"]}
          onChange={setTimeFrame}
        />
      </div>
      <button id="submit-button" type="submit">
        Submit!
      </button>
    </form>
  );
}

export default TopTracksForm;

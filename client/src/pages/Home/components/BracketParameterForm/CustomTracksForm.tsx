import React from "react";
import Input from "./Input";
import List from "../List/List";

type CustomTracksFormProps = {
  items: any;
  onChange: (e: any) => void;
  onItemClick: (e: any) => void;
  onSubmit: (e: any) => void;
};

function CustomTracksForm({
  items,
  onChange,
  onItemClick,
  onSubmit,
}: CustomTracksFormProps): React.JSX.Element {
  return (
    <form onSubmit={onSubmit} id="theform">
      <div className="prompt">
        <Input label="Search for a track:" onChange={onChange} onFocus={() => {}}></Input>
        <List items={items} onItemClick={onItemClick} />
      </div>
      <button id="submit-button" type="submit">
        Submit!
      </button>
    </form>
  );
}

export default CustomTracksForm;

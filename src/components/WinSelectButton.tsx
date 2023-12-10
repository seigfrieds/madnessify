import React from "react";
import "./WinSelectButton.css";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function WinSelectButton({ onClick }: Props): React.JSX.Element {
  return (
    <div>
      <button id="win-select-button" onClick={onClick}>
        Select to win!
      </button>
    </div>
  );
}

export default WinSelectButton;

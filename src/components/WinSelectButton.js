import "./WinSelectButton.css";

function WinSelectButton({ onClick }) {
  return (
    <div>
      <button id="win-select-button" onClick={onClick}>
        Select to win!
      </button>
    </div>
  );
}

export default WinSelectButton;

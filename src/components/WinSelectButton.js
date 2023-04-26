function WinSelectButton({onClick})
{
    return (
        <div className="win-select-button">
            <button onClick={onClick}>Select to win!</button>
        </div>
    );
}

export default WinSelectButton;
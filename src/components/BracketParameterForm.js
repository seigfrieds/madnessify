import "./BracketParameterForm.css";

function BracketParameterForm({handleSubmit, handleNumTracksChange, handleTimeFrameChange})
{
    return (
        <>
            <div className="dropdown">
                <label for="num-songs-select">Select the number of songs: </label>
                <select onChange={handleNumTracksChange} id="num-songs-select" form="theform">
                    <option value={8}>Top 8 songs</option>
                    <option value={16}>Top 16 songs</option>
                    <option value={32}>Top 32 songs</option>
                </select>
            </div>

            <div className="dropdown">
                <label for="time-frame-select">Select the time frame: </label>
                <select onChange={handleTimeFrameChange} id="time-frame-select" form="theform">
                    <option value={"short_term"}>Past 4 weeks</option>
                    <option value={"medium_term"}>Past 6 months</option>
                    <option value={"long_term"}>Past several years</option>
                </select>
            </div>

            <form onSubmit={handleSubmit} id="theform">
                <button id="submit-button" type="submit">Submit!</button>
            </form>
        </>
    );
}

export default BracketParameterForm;
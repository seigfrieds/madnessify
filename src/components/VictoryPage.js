import "./VictoryPage.css";

function roundToDivs(matchesInRound)
{
    let divArray = [];

    for (let i = 0; i < matchesInRound.length; i++)
    {
        let trackOne = matchesInRound[i].matchComponent.props.trackOne;
        let trackTwo = matchesInRound[i].matchComponent.props.trackTwo;
        
        divArray.push(  <div key={trackOne.id}>
                            <img src={trackOne.album.images[0].url} alt={trackOne.name}></img>
                            <p>{trackOne.name}</p>
                        </div>);

        divArray.push(  <div key={trackTwo.id}>
                            <img src={trackTwo.album.images[0].url} alt={trackTwo.name}></img>
                            <p>{trackTwo.name}</p>
                        </div>);
    }

    return divArray;
}

function VictoryPage({bracket})
{
    let winner = bracket[bracket.length-1].matchComponent.props.trackOne;
    let numPlayers = bracket.length;

    return (
        <div id="victory-page">
            <h1 id="winner-display">Winner!</h1>
            <img id="winner-image" src={winner.album.images[0].url} alt={winner.name} width="200" height="200"></img>
            <h4>{winner.artists[0].name + " - " + winner.name}</h4>
            <br></br><br></br>

            <h1 id="bracket-title">The Final 8</h1>

            <article id="container">
                <section id="round-of-16">
                    {roundToDivs(bracket.filter((match) => (numPlayers / Math.pow(2, match.matchRound-1)) === 16))}
                </section>

                <section id="round-of-8">
                    {roundToDivs(bracket.filter((match) => (numPlayers / Math.pow(2, match.matchRound-1)) === 8))}
                </section>

                <section id="round-of-4">
                    {roundToDivs(bracket.filter((match) => (numPlayers / Math.pow(2, match.matchRound-1)) === 4))}
                </section>

                <section id="final">
                    {roundToDivs(bracket.filter((match) => (numPlayers / Math.pow(2, match.matchRound-1)) === 2))}
                </section>

                <section id="winner-round">
                    <div>
                        <img src={winner.album.images[0].url} alt={winner.name} width="40" height="40"></img>
                        <p>{winner.name}</p>
                    </div>
                </section>

            </article>
        </div>
    );
}

export default VictoryPage;
import "./VictoryPage.css";

function roundToDivs(matchesInRound)
{
    let divArray = [];

    for (let i = 0; i < matchesInRound.length; i++)
    {
        let trackOne = matchesInRound[i].matchComponent.props.trackOne;
        let trackTwo = matchesInRound[i].matchComponent.props.trackTwo;
        
        divArray.push(  <div key={trackOne.id}>
                            <img src={trackOne.album.images[0].url} alt={trackOne.name} width="40" height="40"></img>
                            <p>{trackOne.name}</p>
                        </div>);

        divArray.push(  <div key={trackTwo.id}>
                            <img src={trackTwo.album.images[0].url} alt={trackTwo.name} width="40" height="40"></img>
                            <p>{trackTwo.name}</p>
                        </div>);
    }

    return divArray;
}

function VictoryPage({bracket})
{
    let winner = bracket[bracket.length-1].matchComponent.props.trackOne;

    return (
        <>
            <h1>Winner!</h1>
            <img src={winner.album.images[0].url} alt={winner.name} width="200" height="200"></img>
            <p>{winner.artists[0].name + " - " + winner.name}</p>

            <h1 className="bracket-title">The Final 8</h1>

            <article id="container">
                <section id="round-of-8">
                    {roundToDivs(bracket.filter((match) => match.matchRound === 2))}
                </section>

                <section id="round-of-4">
                    {roundToDivs(bracket.filter((match) => match.matchRound === 3))}
                </section>

                <section id="final">
                    {roundToDivs(bracket.filter((match) => match.matchRound === 4))}
                </section>

                <section id="winner-round">
                    <div>
                        <img src={winner.album.images[0].url} alt={winner.name} width="40" height="40"></img>
                        <p>{winner.name}</p>
                    </div>
                </section>

            </article>
        </>
    );
}

export default VictoryPage;
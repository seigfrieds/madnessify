import './App.css';

function App() {
    return (
        <div className="App">
            <div className="match">
                <div className="current-match">
                    <p>Grand Finals!</p>
                </div>

                <div className="player">
                    <iframe src="https://open.spotify.com/embed/track/46fk9wjYcPm0sgym2b7EEE?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    <p>We Major</p>
                    <br></br>
                    <button>Select to win!</button>
                </div>

                <div className="player">
                    <iframe src="https://open.spotify.com/embed/track/2TjdnqlpwOjhijHCwHCP2d?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    <p>The Great Gig in the Sky</p>
                    <br></br>
                    <button>Select to win!</button>
                </div>
            </div>

            <div className="standings">
                <table>
                    <tr>
                        <th id="first">1st</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th id="second">2nd</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th id="thirdfourth">3rd/4th</th>
                        <td>Frank Ocean - Seigfried</td>
                    </tr>
                    <tr>
                        <th id="thirdfourth">3rd/4th</th>
                        <td>Kendrick Lamar - Institutionalized</td>
                    </tr>
                    <tr>
                        <th>5th-8th</th>
                        <td>The Weeknd - Coming Down (Original)</td>
                    </tr>
                    <tr>
                        <th>5th-8th</th>
                        <td>Freddie Gibbs - Lakers</td>
                    </tr>
                    <tr>
                        <th>5th-8th</th>
                        <td>Radiohead - Subterranean Homesick Alien</td>
                    </tr>
                    <tr>
                        <th>5th-8th</th>
                        <td>Lil Yachty - Strike (Holster)</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default App;

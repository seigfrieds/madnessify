import React, { useState, useEffect } from 'react';
import BracketParameterForm from './components/BracketParameterForm';

import './App.css';
import MatchPage from './components/MatchPage.js';
import {CONFIG} from "./apiConfig.js";
import axios from 'axios';

//durstenfeld shuffle: https://stackoverflow.com/a/12646864
function shuffleArray(array) 
{
    for (let i = array.length-1; i>0; i--) 
    {
        let j = Math.floor(Math.random() * (i+1));
        [array[i],array[j]] = [array[j],array[i]];
    }
}

function App() {
    const [token, setToken] = useState("");
    const [topTracks, setTopTracks] = useState(null);

    const [numTracks, setNumTracks] = useState(8);
    const [timeFrame, setTimeFrame] = useState("medium_term");

    async function getTopTracks(token)
    {
        let request = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: "Bearer " + token
            },
            params: {
                limit: numTracks,
                time_range: timeFrame
            }
        });

        shuffleArray(request.data.items)

        setTopTracks(request.data.items);
    }

    function handleSubmit(event) {
        event.preventDefault();

        getTopTracks(token);
    }

    function handleNumTracksChange(event) {
        setNumTracks(event.target.value);
    }

    function handleTimeFrameChange(event) {
        setTimeFrame(event.target.value);
    }

    //when you click login to spotify and login, it returns to url with info
        //e.g. localhost:3000 -> then click spotify login -> localhost:3000/#access_token=BQD5...
        //info split into two: access_token and token_type -> need to split
    useEffect(() => {
        if (window.location.hash)
        {
            const spotifyToken = window.location.hash
                                    .substring(1)
                                    .split("&")
                                    .find(elem => elem.startsWith("access_token"))
                                    .split("=")[1];

            if (spotifyToken) {
                setToken(spotifyToken);
            }

            window.location.hash = "";
        }
    }, []);

    return (
        <div className="App">
            {!token &&
                <>
                    <h1 className="title">Music Madness!</h1><br/>

                    <h2>Create a single-elimination bracket tournament out of your most played songs on Spotify!</h2><br/>

                    <a 
                        href={`${CONFIG.authEndpoint}?client_id=${CONFIG.clientId}&redirect_uri=${CONFIG.redirectUri}&response_type=${CONFIG.responseType}&scope=${CONFIG.scope}`}
                        className="spotify-login-button"
                    >
                        To play, login to Spotify!
                    </a><br/><br/><br/>

                    <a href="https://github.com/seigfrieds/music-madness" target="_blank">GitHub</a>
                </>
            }
            
            {token &&
                <>
                    {topTracks === null
                        ?   <> 
                                <BracketParameterForm 
                                    handleSubmit={handleSubmit}
                                    handleNumTracksChange={handleNumTracksChange}
                                    handleTimeFrameChange={handleTimeFrameChange}
                                />
                                {console.log("Waiting for API...")} 
                            </>
                        :   <MatchPage players={topTracks}/>}
                </>
            }
        </div>
    );
}

export default App;

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

    const [tracks, setTracks] = useState(null);
    const [queryType, setQueryType] = useState(""); //top_tracks, playlist

    const [error, setError] = useState(undefined);

    //global params
    const [numTracks, setNumTracks] = useState(8);

    //top tracks params
    const [timeFrame, setTimeFrame] = useState("medium_term");

    //playlist params
    const [playlistLink, setPlaylistLink] = useState("");
    
    async function getTracks(token)
    {
        if (queryType === "top_tracks") 
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

            setTracks(request.data.items);
        }
        else if (queryType === "playlist")
        {
            const PLAYLIST_ID = playlistLink.split("/playlist/")[1]
                                            .split("?si=")[0];

            //total # of tracks in the playlist
            let totalTracksInPlaylist = 0;

            //spotify playlists have id's of length 22 -> enforce this check to reduce API spam
            if (PLAYLIST_ID.length === 22) {
                //get playlist (Defaults to first 100 tracks)
                let request = await axios.get("https://api.spotify.com/v1/playlists/" + PLAYLIST_ID, {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    params: {
                        fields: "tracks"
                    }
                });

                totalTracksInPlaylist = request.data.tracks.total;
            }

            //if # of tracks in playlist does not accomodate chosen bracket size
            if (totalTracksInPlaylist < numTracks) {
                setError(<p id="error">Error! Not enough tracks in playlist</p>);
            }
            else {
                //calculate # of sections with 100 songs in playlist (e.g. songs 1-99, songs 300-399)
                const NUM_OF_100_SONG_SECTIONS_IN_PLAYLIST = Math.ceil(totalTracksInPlaylist/100);

                //pick random 100 song section in playlist
                let selectedSectionNum = Math.floor(Math.random() * NUM_OF_100_SONG_SECTIONS_IN_PLAYLIST);
                //while randomly selected section cannot accomodate bracket
                while ((totalTracksInPlaylist - selectedSectionNum*100) < numTracks) 
                    selectedSectionNum = Math.floor(Math.random() * NUM_OF_100_SONG_SECTIONS_IN_PLAYLIST);

                //get random 100 song section in playlist from api
                let selectedSection = await axios.get("https://api.spotify.com/v1/playlists/" + PLAYLIST_ID + "/tracks?offset=" + (selectedSectionNum*100) + "&limit=100&locale=en-US,en;q=0.9", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                /* get tracks! */
                shuffleArray(selectedSection.data.items);

                let chosenPlaylistTracks = [];
                for (let i = 0; i < numTracks; i++)
                    chosenPlaylistTracks[i] = selectedSection.data.items[i].track;

                setTracks(chosenPlaylistTracks);
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        getTracks(token);
    }

    function handlePlaylistLinkChange(event)
    {
        console.log(playlistLink);
        setPlaylistLink(event.target.value);
    }

    function handleQueryTypeChange(event)
    {
        setQueryType(event.target.value);
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
                <div id="home-page">
                    <h1 id="app-title">Radio Madness!</h1>

                    <h2 id="app-hook">Create a single-elimination bracket tournament out of your favorite songs on Spotify!</h2><br/>
                    <h2 id="special-notice">In Development Mode - Need special access to use the site</h2><br/>

                    <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/IMyBgxkcuw4">
                    </iframe><br></br>

                    <a 
                        href={`${CONFIG.authEndpoint}?client_id=${CONFIG.clientId}&redirect_uri=${CONFIG.redirectUri}&response_type=${CONFIG.responseType}&scope=${CONFIG.scope}`}
                        className="spotify-login-button"
                    >
                        Log in to Spotify!
                    </a><br/><br/><br/>

                    <a id="github-link" href="https://github.com/seigfrieds/spotify-madness" target="_blank">GitHub</a>
                </div>
            }
            
            {token &&
                <>
                    {tracks === null
                        ?   <> 
                                <BracketParameterForm 
                                    handleSubmit={handleSubmit}
                                    handleQueryTypeChange={handleQueryTypeChange}
                                    handleNumTracksChange={handleNumTracksChange}
                                    handleTimeFrameChange={handleTimeFrameChange}
                                    handlePlaylistLinkChange={handlePlaylistLinkChange}
                                />
                                {error !== undefined && error}
                                {console.log("Waiting for API...")} 
                            </>
                        :   <MatchPage players={tracks}/>}
                </>
            }
        </div>
    );
}

export default App;

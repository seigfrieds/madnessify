import "./Player.css";

function insertEmbedHtml(id)
{
    let embedUrl = "https://open.spotify.com/embed/track/" + id + "?utm_source=generator&theme=0";

    return <iframe 
                src={embedUrl}
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
            ></iframe>;
}

function Player({id, artist, title, onClick}) 
{
    return (
        <div>
            {insertEmbedHtml(id)}

            <h3 className="track-artist-title">
                {artist + " - " + title}
            </h3>
        </div>
    );
}

export default Player;
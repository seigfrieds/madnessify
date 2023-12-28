import React from "react";
import "./Player.css";

type Props = {
  id: string;
  artist: string;
  title: string;
};

function Player({ id, artist, title }: Props): React.JSX.Element {
  return (
    <div>
      {insertEmbedHtml(id)}

      <h3 className="track-artist-title">{artist + " - " + title}</h3>
    </div>
  );
}

function insertEmbedHtml(id: string): React.JSX.Element {
  const embedUrl = "https://open.spotify.com/embed/track/" + id + "?utm_source=generator&theme=0";

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}

export default Player;

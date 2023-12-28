import React from "react";
import { insertEmbedHtml } from "./Player.logic";
import "./Player.css";

type Props = {
  id: string;
  artist: string;
  title: string;
};

export default function Player({ id, artist, title }: Props): React.JSX.Element {
  return (
    <div>
      {insertEmbedHtml(id)}

      <h3 className="track-artist-title">{artist + " - " + title}</h3>
    </div>
  );
}

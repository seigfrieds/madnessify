import React from "react";

export function insertEmbedHtml(id: string): React.JSX.Element {
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

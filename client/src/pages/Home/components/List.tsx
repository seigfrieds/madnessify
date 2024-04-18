import "./List.css";
import React from "react";
import { Song } from "../../../types";

type Props = {
  items: Array<Song> | null;
  onItemClick: (...args: any[]) => any;
};

export default function List({ items, onItemClick }: Props): React.JSX.Element {
  return (
    <ul id="search-results">
      {items != null &&
        items.map((item) => (
          <li key={item.id} value={JSON.stringify(item)} onClick={onItemClick}>
            {item.artists[0].name + " - " + item.name}
          </li>
        ))}
    </ul>
  );
}

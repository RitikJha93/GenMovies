import { React, useState } from "react";
import { Link } from "react-router-dom";
export default function List({ close, hover, clicked }) {
  const handleClick = (data) => {
    close();
    hover(data);
  };
  const style = {
    color: "#00ff65",
    borderRadius: "5px",
    fontWeight: "600"
  };
  const none = {
    color: "wheat"
  };
  return (
    <ul>
      <li>
        <Link
          to="/"
          style={clicked === "home" ? style : none}
          onClick={() => handleClick("home")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/movies"
          style={clicked === "movies" ? style : none}
          onClick={() => handleClick("movies")}
        >
          Movies
        </Link>
      </li>
      <li>
        <Link
          to="/tvshows"
          style={clicked === "tv" ? style : none}
          onClick={() => handleClick("tv")}
        >
          Tv Shows
        </Link>
      </li>
      <li>
        <Link
          to="/trending"
          style={clicked === "trending" ? style : none}
          onClick={() => handleClick("trending")}
        >
          Trending
        </Link>
      </li>
    </ul>
  );
}

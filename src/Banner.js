import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "./request";
import "./banner.css";
const base_url = "https://images.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const banner = await axios.get(
        "https://api.themoviedb.org/3" + requests.fetchTrending
      );
      setMovies(
        banner.data.results[
          Math.floor(Math.random() * banner.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      `
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.original_title || movie?.title || movie?.name}
        </h1>
        <div className="banner_button">
          <button className="button">Play</button>
          <button className="button">My List</button>
        </div>
        <p className="banner_overview">{movie?.overview}</p>
        <div className="banner_footer"></div>
      </div>
    </header>
  );
}

export default Banner;

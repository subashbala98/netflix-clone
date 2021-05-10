import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_Url = "https://images.tmdb.org/t/p/original/";
const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailer] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        "https://api.themoviedb.org/3" + props.fetchUrl
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchUrl]);
  const opts = {
    width: "100%",
    height: "390",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailer("");
    } else {
      movieTrailer(movie?.original_title || " ")
        .then((url) => {
          const videoParams = new URLSearchParams(new URL(url).search);
          setTrailer(videoParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="row">
      <h1 className="title">{props.title}</h1>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => {
                handleClick(movie);
              }}
              className={`row_poster ${props.bigTrending && "trending"} `}
              src={`${base_Url}${
                props.bigTrending ? movie.poster_path : movie.poster_path
              }`}
              alt={movie.title}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
export default Row;

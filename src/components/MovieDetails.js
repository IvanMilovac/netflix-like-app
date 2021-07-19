import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Nav from "./Nav";
import "./MovieDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useContext(MovieContext);
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const { backdrop_path, poster_path, overview, title, original_title, id } =
    movie;
  const url_title = title ? title.replace(/\s/g, "-").toLowerCase() : "";
  console.log(url_title);
  return (
    <>
      <Nav />
      <div className="movieDetails__background">
        <div className="movieDetails__wrapper">
          <div className="movie__image">
            <img src={BASE_URL + (poster_path || backdrop_path)} alt="" />
          </div>
          <div className="movie__content">
            <h2 className="movie__title">{title || original_title}</h2>
            <p className="movie__description">{overview}</p>
          </div>
          <div className="cta_btn">
            <a href="/">
              Back
            </a>
            <a
              href={"https://www.themoviedb.org/movie/" + id + `-` + url_title}
              alt=""
            >
              Go to TMDB
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

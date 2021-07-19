import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const { token } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      const instance = axios.create({
        baseURL: "http://" + process.env.IP_NODE_SERVER + ":5000/api/movies/",
      });
      const movies = await instance.get("fetchActionMovies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let index = Math.floor(Math.random() * movies.data.length - 1);
      setMovie(movies.data[index]);
      return movies;
    }
    fetchData();
  }, [token]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${
          movie?.backdrop_path || movie?.poster_path
        }")`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name || "No Title"}
        </h1>
        <div className="banner__buttons">
          <button href="#" className="banner__button">
            Play
          </button>
          <button href="#" className="banner__button">
            My List
          </button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner--fadeBottom"> </div>
    </header>
  );
}

export default Banner;

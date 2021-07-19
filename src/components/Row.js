import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const history = useHistory();
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const { token } = useContext(UserContext);
  const [movie, setMovie] = useContext(MovieContext);
  useEffect(() => {
    async function fetchData() {
      const instance = axios.create({
        baseURL: "http://" + process.env.IP_NODE_SERVER + ":5000/api/movies/",
      });
      const result = await instance.get(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(result.data);
      return result.data;
    }
    fetchData();
  }, [fetchUrl, token]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div className="card" key={movie.id}>
                <div className="card-content card-front">
                  <img
                    key={movie.id}
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    src={`${baseUrl}${
                      isLargeRow
                        ? movie.poster_path || movie.backdrop_path
                        : movie.backdrop_path || movie.movie.poster_path
                    }`}
                    alt={movie.name}
                  />
                </div>
                <div className="card-content card-back">
                  <h4>{movie.title}</h4>
                  <button
                    className="btn-view_more"
                    onClick={(e) => {
                      history.push("/detail");
                      setMovie(movie);
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default Row;

const Movie = require("../models/movie");
const User = require("../models/user");
const HttpError = require("../models/HttpError");
const { tmdbAPIcall } = require("../middleware/tmdb");
const { verifyJWT } = require("../middleware/auth");

//function for retrieving all movie data from MongoDB
const getAllMovies = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(new HttpError("Missing authorization header.", 403));
    }
    let token = req.headers.authorization.split(" ");
    const { sub } = verifyJWT(token[1]);
    let user = await User.findOne({ _id: sub });
    if (!user) {
      return next(
        new HttpError(
          "Your token is not valid or process of token validation has failed.",
          403
        )
      );
    }
    const movies = await Movie.find({ category: req.params.catName });
    if (!movies || movies.length === 0) {
      console.log(movies);
      return next(
        new HttpError("The resources are not available in the database.", 404)
      );
    }
    res.send(movies);
  } catch (e) {
    return new HttpError(
      "Something went wrong with fetching movies from a database.",
      500
    );
  }
};

//function for storing movie data from a TMDB API to a MongoDB
const updateMovieList = async (req, res, next) => {
  try {
    let results = await tmdbAPIcall(req.params.catName);
    if (!results) {
      return next(
        new HttpError("There is no result for your request params.", 404)
      );
    }
    const moviesIds = results.map((movie) => {
      return movie.id;
    });
    moviesIds.map(async (movieId) => {
      const fMovie = await Movie.findOne({ id: movieId });
      if (fMovie) {
        return;
      }
      const result = results.find((obj) => {
        return obj.id === movieId;
      });
      const {
        id,
        overview,
        backdrop_path,
        title,
        original_title,
        poster_path,
      } = result;
      const movie = new Movie({
        category: req.params.catName,
        id,
        overview,
        backdrop_path,
        title,
        original_title,
        poster_path,
      });
      try {
        await movie.save();
      } catch (e) {
        return next(
          new HttpError(`Saving to database failed due: ${e.message}`, 500)
        );
      }
    });
    res.send("Successfully updated.");
  } catch (e) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

module.exports.getAllMovies = getAllMovies;
module.exports.updateMovieList = updateMovieList;

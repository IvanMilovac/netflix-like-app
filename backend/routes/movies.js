const express = require("express");
const moviesControllers = require("../controllers/movies-controllers");

const router = express.Router();

//get and post route for movies
router.get("/:catName", moviesControllers.getAllMovies);
router.post('/:catName', moviesControllers.updateMovieList);

module.exports = router;

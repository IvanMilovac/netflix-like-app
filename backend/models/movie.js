const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  category: { type: String },
  id: { type: Number },
  overview: { type: String },
  backdrop_path: { type: String },
  title: { type: String },
  original_title: { type: String },
  poster_path: { type: String },
});

module.exports = mongoose.model("Movie", movieSchema);

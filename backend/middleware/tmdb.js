const instance = require("./axios");
const Requests = require("../Requests");

//function for calling TMDB API
module.exports.tmdbAPIcall = async (catName) => {
  try {
    let response = await instance.get(Requests(process.env.tmdbAPI)[catName]);
    response.data.results.category = catName;
    return response.data.results;
  } catch (e) {
    return e;
  }
};

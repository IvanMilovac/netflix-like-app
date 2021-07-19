//TMDB API endpoints

const Requests = (APIkey) => {
  return {
    fetchTrending: `/trending/all/week?api_key=${APIkey}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${APIkey}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${APIkey}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${APIkey}&with_genres=28`,
    fetchComedyMovies: `/discover/tv?api_key=${APIkey}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${APIkey}&with_genres=27`,
    fetchRomanceMovies: `/discover/tv?api_key=${APIkey}&with_genres=10749`,
    fetchDocumentaries: `/discover/tv?api_key=${APIkey}&with_genres=99`,
  };
};

module.exports = Requests;

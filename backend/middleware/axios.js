const axios = require("axios");
const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

module.exports = instance;
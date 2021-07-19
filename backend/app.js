//import
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

//creating app pbject
const app = express();

//importing routes from route folder
const movies = require("./routes/movies");
const users = require("./routes/users");

//importing
dotenv.config();

//Cross-Origin Resource Sharing
app.use(cors());

//parsing incoming JSON objects
app.use(express.json());

//routing incoming request ot proper route
app.use("/api/movies", movies);
app.use("/api/users", users);

//error middleware
app.use((error, req, res, next) => {
  res.status(error.code).json({ message: error.message });
});

//connecting to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database. Server is running...");
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });

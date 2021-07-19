import React from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import "./HomeScreen.css";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINAL"
        fetchUrl="fetchNetflixOriginals"
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl="fetchTrending" />
      <Row title="Top Rated" fetchUrl="fetchTopRated" />
      <Row title="Action Movies" fetchUrl="fetchActionMovies" />
      <Row title="Comedy Movies" fetchUrl="fetchComedyMovies" />
      <Row title="Horror Movies" fetchUrl="fetchHorrorMovies" />
      <Row title="Romance Movies" fetchUrl="fetchRomanceMovies" />
      <Row title="Documentaries" fetchUrl="fetchDocumentaries" />
    </div>
  );
}

export default HomeScreen;

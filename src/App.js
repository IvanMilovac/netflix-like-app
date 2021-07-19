import React, { useState } from "react";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import LandingScreen from "./pages/LandingScreen";
import ProfileScreen from "./pages/ProfileScreen";
import MovieDetails from "./components/MovieDetails";
import { MovieContext } from "./context/MovieContext";
import useAuth from "./hooks/AuthHook";
import { UserContext } from "./context/UserContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [movie, setMovie] = useState();
  const { token, name, login, logout } = useAuth();
  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route exact path="/landing">
          <LandingScreen />
        </Route>
        <Redirect to="/landing" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/profile">
          <ProfileScreen />
        </Route>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/detail">
          <MovieDetails />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <UserContext.Provider value={{ token, name, login, logout }}>
      <MovieContext.Provider value={[movie, setMovie]}>
        <div className="App">
          <Router>{routes}</Router>
        </div>
      </MovieContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import "./LandingScreen.css";
import netflixLogo from "../images/netflixLogo.png";
import axios from "axios";
import { useEffect } from "react";

function LandingScreen() {
  const [signIn, setSignIn] = useState("landing");
  const history = useHistory();
  useEffect(() => {
    setSignIn("landing");
  }, []);
  const gettingStartedHandler = async (event) => {
    event.preventDefault();
    if (event.target[0].value !== "") {
      const instance = axios.create({
        baseURL: "http://" + process.env.IP_NODE_SERVER + ":5000/api/users/",
        timeout: 1000,
      });
      const result = await instance.post("/existance", {
        email: event.target[0].value,
      });
      if (result.data.existedUser) {
        setSignIn("signin");
      } else {
        setSignIn("signup");
      }
    }
  };

  const signInButtonHandler = (e) => {
    e.preventDefault();
    setSignIn("signin");
  };

  const signUpButtonHandler = (e) => {
    e.preventDefault();
    setSignIn("signup");
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          src={netflixLogo}
          alt=""
          className="loginScreen__logo"
          onClick={() => history.push("/")}
        />
        {signIn === "landing" || signIn === "signup" ? (
          <button
            className="loginScreen__signInButton"
            onClick={signInButtonHandler}
          >
            Sign In
          </button>
        ) : (
          <button
            className="loginScreen__signInButton"
            onClick={signUpButtonHandler}
          >
            Sign Up
          </button>
        )}
      </div>
      <div className="loginScreen__gradient" />
      <div className="loginScreen__body">
        {signIn === "landing" ? (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen__input">
              <form onSubmit={gettingStartedHandler}>
                <input type="email" placeholder="Email Address" />
                <button className="loginScreen__getStarted">GET STARTED</button>
              </form>
            </div>
          </>
        ) : signIn === "signin" ? (
          <SignInScreen />
        ) : (
          <SignUpScreen setSignIn={setSignIn} />
        )}
      </div>
    </div>
  );
}

export default LandingScreen;

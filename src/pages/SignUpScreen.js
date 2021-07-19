import React, { useRef, useState } from "react";
import axios from "axios";

import "./SignUpScreen.css";
import "./LandingScreen.css";

function SignUpScreen({ setSignIn }) {
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const signUp = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: "http://" + process.env.IP_NODE_SERVER + ":5000/api/users/",
      timeout: 1000,
    });
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
    };

    instance
      .post("/register", user)
      .then((result) => {
        console.log(result.data.message);
        return setSignIn("signin");
      })
      .catch((err) => {
        console.log(err);
        return setError(`${err.response.data.message}`);
      });
  };
  return (
    <div className="signUpScreen">
      <form onSubmit={signUp}>
        {error === "" ? (
          <>
            <h1>Sign Up</h1>
            <input ref={usernameRef} placeholder="Name" type="Text" />
            <input ref={emailRef} placeholder="Email" type="Email" />
            <input ref={passwordRef} placeholder="Password" type="Password" />
            <button type="submit">Sign Up</button>
          </>
        ) : (
          <>
            <h1>{`Error: ${error}`}</h1>
            <button
              className="loginScreen__signInButton"
              onClick={() => setSignIn("signin")}
            >
              Sign In
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default SignUpScreen;
